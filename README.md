# CalcZip - 무료 계산기 모음

## 파일 구조

```
mysite/
├── index.html        ← 메인 페이지 (계산기 목록)
├── stock-add.html    ← 주식·코인 물타기 계산기 ✅
├── privacy.html      ← 개인정보처리방침 (AdSense 필수)
├── style.css         ← 전체 공통 스타일
└── README.md
```

## 추가 예정 페이지
- stock-profit.html  → 수익률 계산기
- stock-split.html   → 분할 매수 계산기
- salary.html        → 연봉 실수령액
- compound.html      → 복리 계산기
- savings.html       → 적금 계산기

## GitHub Pages 배포 방법

1. GitHub 계정 만들기 (없으면): https://github.com
2. 새 Repository 만들기 (이름: calczip 또는 원하는 이름)
3. 이 폴더 파일들을 모두 업로드
4. Settings → Pages → Branch: main → Save
5. 몇 분 후 https://[계정명].github.io/[repo이름] 으로 접속 가능

## AdSense 삽입 위치
각 HTML 파일에서 아래 주석을 찾아서 AdSense 코드로 교체:
`<!-- AdSense 코드를 여기에 삽입하세요 -->`
