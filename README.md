# Directional Assignment

로그인 기반 게시판과 차트 대시보드를 구현한 Next.js 과제 프로젝트입니다.

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000` 접속 후 제공된 계정으로 로그인합니다.

### 빌드/배포

```bash
npm run build
npm run start
```

### 환경 변수

`NEXT_PUBLIC_API_BASE_URL`을 설정하면 API 엔드포인트를 변경할 수 있습니다.  
미설정 시 기본값 `https://fe-hiring-rest-api.vercel.app`를 사용합니다.  
관련 코드: `src/lib/constants.ts`.

## 사용한 기술 스택

- Next.js 16 (App Router), React 19, TypeScript
- Ant Design 6, styled-components
- Tanstack React Query 5, Zustand
- Recharts
- Biome (lint/format)

## 주요 구현 기능 요약

- 로그인
  - `/auth/login` API 연동, 토큰/유저 정보를 Zustand에 저장 및 persist
  - 인증 상태에 따라 라우팅을 보호하는 `AuthGuard`
- 게시판
  - 무한 스크롤 기반 목록 조회
  - 제목/본문 검색(디바운스), 정렬/정렬방향/카테고리 필터
  - 컬럼 표시 여부 토글 및 리사이즈 지원
  - 게시글 CRUD, 전체 삭제, 더미 데이터 30건 생성
  - 금칙어/길이/태그 개수 제한 등의 유효성 검사
- 차트 대시보드
  - 막대/도넛, 막대/영역 전환 가능한 차트
  - 멀티라인(이중 축) 차트와 커스텀 툴팁
  - 범례 토글/색상 변경 UI 제공

## 설계 포인트

- 기능 단위 분리: `features/auth`, `features/posts`, `features/charts`로 도메인 구성
- API 계층화: `requestJson` 유틸로 공통 HTTP 처리 및 에러 핸들링
- 데이터 가공 위치 통일: React Query의 `select`에서 서버 DTO를 화면 모델로 변환
- UI 일관성: Ant Design 컴포넌트 + styled-components를 병행, SSR 레지스트리 적용

## 폴더 구조

```
src/
  app/                # 라우팅 및 레이아웃(App Router)
  apis/               # API 호출 모듈
  components/         # 공용 컴포넌트
  features/           # 도메인별 기능 묶음
  hooks/              # 공용 훅
  lib/                # 상수/HTTP 유틸
  styles/             # 전역 스타일
```
