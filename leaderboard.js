// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyDdiNApueUlXQIRYDRBAuTnjWFf4ZNTsnU",
  authDomain: "goni-6492d.firebaseapp.com",
  projectId: "goni-6492d",
  storageBucket: "goni-6492d.firebasestorage.app",
  messagingSenderId: "251038196229",
  appId: "1:251038196229:web:6eca90c7ae1ca0c906726c"
};

// Firebase 초기화
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit, where, Timestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

// 이번 주 시작 (월요일 00:00 기준)
function getWeekStart() {
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? 6 : day - 1;
  const monday = new Date(now);
  monday.setDate(now.getDate() - diff);
  monday.setHours(0, 0, 0, 0);
  return Timestamp.fromDate(monday);
}

// 점수 저장
export async function saveScore(game, nickname, score) {
  try {
    await addDoc(collection(db, 'leaderboard', game, 'scores'), {
      nickname: nickname.slice(0, 10),
      score,
      createdAt: Timestamp.now()
    });
    return true;
  } catch(e) {
    console.error('점수 저장 실패:', e);
    return false;
  }
}

// 이번 주 TOP 10 불러오기
export async function getTopScores(game) {
  try {
    const weekStart = getWeekStart();
    const q = query(
      collection(db, 'leaderboard', game, 'scores'),
      where('createdAt', '>=', weekStart),
      orderBy('createdAt', 'desc'),
      orderBy('score', 'desc'),
      limit(10)
    );
    // orderBy 복합 인덱스 없을 수 있으니 단순 쿼리로
    const q2 = query(
      collection(db, 'leaderboard', game, 'scores'),
      where('createdAt', '>=', weekStart),
      limit(100)
    );
    const snap = await getDocs(q2);
    const docs = snap.docs.map(d => d.data());
    docs.sort((a, b) => b.score - a.score);
    return docs.slice(0, 10);
  } catch(e) {
    console.error('점수 불러오기 실패:', e);
    return [];
  }
}
