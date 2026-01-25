# 공튀기기 (Bounce Ball)

2000년대 플래시 게임 BOUND의 모바일 웹 버전

## Overview

| 항목 | 값 |
|------|-----|
| **배포 URL** | https://bounce-ball-dusky.vercel.app |
| **Supabase** | 미사용 |
| **렌더링** | Canvas 2D API |

## 진행상황

| 영역 | 상태 |
|------|:----:|
| Frontend | ✅ |
| 테스트 | ✅ (31/31 통과) |
| 배포 | ✅ |

## 게임 설정 (GAME_CONFIG)

| 설정 | 값 |
|------|-----|
| GRAVITY | 0.3 |
| BOUNCE_VELOCITY | -8 |
| MOVE_SPEED | 4 |
| BALL_RADIUS | 4 |
| JUMP_BOOST | 1.8 |

## 블록 타입

normal, jump, breakable, arrow, bomb

## 프로젝트 구조

```
src/
├── components/game/    # GameCanvas, controls, renderer
├── game/engine/        # 물리 엔진, 충돌 처리
├── game/stages/        # 스테이지 데이터
└── hooks/
```

---

*전역 설정 참조: `workspace/CLAUDE.md`*
