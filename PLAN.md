# 공튀기기 (Bounce Ball) - 구현 계획

## 개요

2002년 일본 CraftM의 "BOUND" 게임을 모바일 웹으로 재현한 향수 자극 게임

### 핵심 게임플레이
- 공이 **자동으로 통통 튀면서** 이동
- 플레이어는 **좌우 방향만** 조절
- **오른쪽 출구**로 나가면 스테이지 클리어
- 벽타기(삼각 뛰기) 테크닉 지원

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | React 18 + Vite |
| Language | TypeScript |
| Rendering | Canvas API |
| Styling | Tailwind CSS |
| Database | Supabase (Project 1 - 게임) |
| Schema | `bounce_ball` |

---

## 핵심 기능

### 1. 물리 엔진
- [x] 중력 (gravity)
- [x] 바운스 (bounce coefficient)
- [x] 좌우 이동 속도
- [x] 벽 충돌 & 반사
- [x] 벽타기 테크닉 (반대 방향키로 튕기기)

### 2. 블록 시스템

| 블록 타입 | 색상 | 효과 |
|----------|------|------|
| Normal | 회색 | 기본 발판 |
| Jump | 노랑 | 높이 튀어오름 (1.5x~2x) |
| Breakable | 갈색 | 밟으면 사라짐 |
| Arrow | 파랑 | 화살표 방향으로 발사 |
| Bomb | 빨강 | 닿으면 사망 |

### 3. 스테이지 시스템
- JSON 기반 레벨 데이터
- 스테이지별 블록 배치
- 시작 위치 & 출구 위치
- 총 10~20 스테이지 (난이도 점진적 상승)

### 4. 조작 시스템

| 플랫폼 | 조작 방식 |
|--------|----------|
| 모바일 | 화면 좌/우 터치 또는 가상 버튼 |
| PC | 방향키 ← → |

### 5. 게임 시스템
- 스테이지 클리어 조건 (출구 도달)
- 사망 시 스테이지 처음부터
- 클리어 타임 기록
- 스테이지별 최고 기록 저장

---

## 디렉토리 구조

```
bounce-ball/
├── src/
│   ├── components/
│   │   ├── Game.tsx              # 메인 게임 컴포넌트
│   │   ├── Canvas.tsx            # 캔버스 렌더러
│   │   ├── TouchControls.tsx     # 모바일 터치 컨트롤
│   │   ├── StageSelect.tsx       # 스테이지 선택 화면
│   │   ├── GameOver.tsx          # 게임오버/클리어 화면
│   │   └── ui/                   # 공통 UI 컴포넌트
│   │
│   ├── game/
│   │   ├── engine/
│   │   │   ├── Physics.ts        # 물리 엔진
│   │   │   ├── Collision.ts      # 충돌 감지
│   │   │   └── GameLoop.ts       # 게임 루프
│   │   │
│   │   ├── entities/
│   │   │   ├── Ball.ts           # 공 엔티티
│   │   │   ├── Block.ts          # 블록 엔티티
│   │   │   └── Exit.ts           # 출구 엔티티
│   │   │
│   │   ├── stages/
│   │   │   ├── StageLoader.ts    # 스테이지 로더
│   │   │   └── stages.json       # 스테이지 데이터
│   │   │
│   │   └── types.ts              # 게임 타입 정의
│   │
│   ├── hooks/
│   │   ├── useGameLoop.ts        # 게임 루프 훅
│   │   ├── useInput.ts           # 입력 처리 훅
│   │   └── useStage.ts           # 스테이지 관리 훅
│   │
│   ├── lib/
│   │   └── supabase.ts           # Supabase 클라이언트
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── public/
│   └── assets/                   # 이미지/사운드 (선택)
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

---

## 구현 순서

### Phase 1: 기본 세팅 (30분)
1. Vite + React + TypeScript 프로젝트 생성
2. Tailwind CSS 설정
3. 기본 파일 구조 생성

### Phase 2: 게임 엔진 코어 (1시간)
1. Canvas 렌더링 시스템
2. 게임 루프 (requestAnimationFrame)
3. 물리 엔진 (중력, 바운스)
4. 공 엔티티 구현

### Phase 3: 블록 & 충돌 (1시간)
1. 블록 엔티티 구현 (5가지 타입)
2. 충돌 감지 시스템
3. 블록별 효과 적용

### Phase 4: 조작 & 입력 (30분)
1. 키보드 입력 처리
2. 모바일 터치 컨트롤
3. 벽타기 테크닉 구현

### Phase 5: 스테이지 시스템 (1시간)
1. 스테이지 데이터 구조 설계
2. 스테이지 로더 구현
3. 5~10개 스테이지 제작
4. 스테이지 선택 UI

### Phase 6: UI & 완성도 (30분)
1. 시작 화면
2. 게임오버/클리어 화면
3. 타이머 & 기록 표시
4. 반응형 디자인 마무리

### Phase 7: 데이터 연동 (선택)
1. Supabase 스키마 생성
2. 클리어 기록 저장
3. 랭킹 시스템

---

## Supabase 스키마 (선택)

```sql
-- bounce_ball 스키마 생성
CREATE SCHEMA IF NOT EXISTS bounce_ball;

-- 게임 기록 테이블
CREATE TABLE bounce_ball.game_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR NOT NULL,
  stage_number INTEGER NOT NULL,
  clear_time INTEGER NOT NULL,  -- 밀리초
  death_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 스테이지별 최고 기록
CREATE TABLE bounce_ball.stage_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR NOT NULL,
  stage_number INTEGER NOT NULL,
  best_time INTEGER NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, stage_number)
);
```

---

## 참고 자료

- [BOUND - 나무위키](https://namu.wiki/w/BOUND)
- [공튀기기 플래시게임 - 조아게임](https://zoagame.com/257)
