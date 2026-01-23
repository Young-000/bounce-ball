# 공튀기기 (Bounce Ball) - CLAUDE.md

## 프로젝트 개요

2000년대 플래시 게임 **BOUND**의 모바일 웹 버전.
공이 자동으로 튀고, 플레이어는 좌/우 이동만 조절하여 출구까지 도달하는 게임.

## 기술 스택

| 분류 | 기술 |
|------|------|
| Frontend | React 18 + TypeScript |
| 렌더링 | Canvas 2D API |
| 스타일링 | Tailwind CSS |
| 빌드 | Vite 5 |
| 테스트 | Vitest + Testing Library |

## 프로젝트 구조

```
src/
├── components/
│   ├── game/           # 게임 관련 컴포넌트
│   │   ├── GameCanvas.tsx
│   │   ├── controls/   # 터치 컨트롤
│   │   ├── hud/        # HUD
│   │   └── renderer/   # Canvas 렌더러들
│   ├── screens/        # 화면 컴포넌트 (Start, Clear, etc)
│   └── ui/             # 공통 UI 컴포넌트
├── game/
│   ├── engine/         # 물리 엔진, 충돌 처리
│   ├── stages/         # 스테이지 데이터
│   └── types.ts        # 게임 타입 정의
├── hooks/              # React 훅들
└── styles/             # CSS 파일들
```

## 게임 설정 (GAME_CONFIG)

| 설정 | 값 | 설명 |
|------|-----|------|
| GRAVITY | 0.3 | 중력 |
| BOUNCE_VELOCITY | -8 | 바운스 속도 (고정) |
| MOVE_SPEED | 4 | 좌우 이동 속도 |
| BALL_RADIUS | 6 | 공 반지름 |
| JUMP_BOOST | 1.8 | 점프 블록 배수 |

## 체크리스트

### 코드 품질
- [ ] `npm run lint` 에러 0개
- [ ] `npm run type-check` 에러 0개
- [ ] `npm run build` 성공

### 테스트
- [ ] `npm test` 통과율 80%+
- [ ] 핵심 로직 (Physics, Collision) 테스트 커버리지

### 기능
- [x] 공 자동 바운스
- [x] 좌/우 이동 컨트롤
- [x] 블록 타입 (normal, jump, breakable, arrow, bomb)
- [x] 스테이지 진행
- [x] 클리어/게임오버 화면
- [x] 터치 컨트롤

### 배포
- [ ] Vercel 배포
- [ ] 프로덕션 URL 정상 동작

## 스크립트

```bash
npm run dev          # 개발 서버
npm run build        # 프로덕션 빌드
npm run lint         # ESLint 검사
npm run type-check   # 타입 검사
npm test             # 테스트 실행
```
