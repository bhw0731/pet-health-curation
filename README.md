# 🐾 펫헬스 큐레이션 (MVP)

반려동물의 **나이 · 종 · 주요 고민**을 입력하면, 커뮤니티 데이터를 기반으로
맞춤형 건강 정보를 추천해 주는 웹 서비스의 MVP 스캐폴드입니다.

## 기술 스택
- **Frontend**: React 18 + Vite + Tailwind CSS v4
- **Backend**: Node.js + Express (ESM)
- **DB**: SQLite (내장 `node:sqlite` 모듈 — 네이티브 컴파일/별도 설치 불필요)

## 폴더 구조
```
pet/
├── backend/                 # Express API 서버
│   ├── data/app.db          # SQLite DB (최초 실행 시 자동 생성·시드, gitignore)
│   └── src/
│       ├── server.js        # 앱 진입점 / 미들웨어
│       ├── routes/          # API 라우트 (/api/curation)
│       ├── services/        # 유효성 검사 + 큐레이션 로직
│       ├── repositories/    # 데이터 접근 계층 (SQL 캡슐화)
│       ├── db/              # 스키마/연결(database.js) + 시드(seed.js)
│       └── data/            # 시드 소스용 정적 데이터 (규칙·콘텐츠·후기)
└── frontend/                # React 클라이언트
    └── src/
        ├── App.jsx          # 페이지 조립 + 상태 관리
        ├── components/      # Navbar, Hero, Features, PetForm, CurationResult, Footer
        └── lib/api.js       # API 호출 모음
```

> **데이터 흐름**: `data/*.js`(초기 데이터 정의) → 최초 실행 시 `db/seed.js`가 SQLite로 적재 →
> 런타임 조회는 `repositories/curationRepo.js`를 통해 DB에서 수행.
> DB를 초기화하려면 `backend/data/app.db*` 파일을 삭제하고 서버를 재시작하세요.

## 실행 방법

### 1) 백엔드
```bash
cd backend
npm install
npm run dev        # http://localhost:4000
```

### 2) 프론트엔드 (새 터미널)
```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```
> Vite 프록시가 `/api` 요청을 백엔드(4000)로 전달하므로 두 서버를 함께 실행하세요.

## API 요약
| Method | Endpoint                  | 설명                                |
|--------|---------------------------|-------------------------------------|
| GET    | `/api/health`             | 헬스 체크                           |
| GET    | `/api/curation/options`   | 폼 선택지(종/고민 목록) 조회        |
| POST   | `/api/curation`           | 입력값 → 맞춤 큐레이션 결과 반환     |

### POST `/api/curation` 요청 예시
```json
{
  "petName": "콩이",
  "petType": "dog",
  "ageMonths": 24,
  "concerns": ["skin", "weight"]
}
```
- 유효성 실패 시 `422`와 함께 `{ "error": "ValidationError", "fields": { ... } }` 반환

## 다음 단계 (MVP 이후)
- 큐레이션 규칙 데이터를 DB(PostgreSQL 등)로 이전
- 실제 커뮤니티 게시글/통계 연동
- 결과 저장 · 공유 기능, 사용자 계정
