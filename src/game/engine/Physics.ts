import { BallState, InputState, GAME_CONFIG } from '../types';

/**
 * BOUND 스타일 물리 엔진
 * - 공은 항상 통통 튀고 있음
 * - 바닥/블록에 닿으면 일정 높이로 튀어오름
 * - 플레이어는 좌우 이동만 조절
 */
export function updateBallPhysics(
  ball: BallState,
  input: InputState,
  stageWidth: number,
  stageHeight: number
): BallState {
  if (!ball.isAlive) return ball;

  let { x, y, vx, vy } = ball;
  const { radius } = ball;

  // 좌우 입력 처리
  if (input.left) {
    vx = -GAME_CONFIG.MOVE_SPEED;
  } else if (input.right) {
    vx = GAME_CONFIG.MOVE_SPEED;
  } else {
    // 공중에서 서서히 감속
    vx *= GAME_CONFIG.FRICTION;
    if (Math.abs(vx) < 0.1) vx = 0;
  }

  // 중력 적용
  vy += GAME_CONFIG.GRAVITY;

  // 최대 낙하 속도 제한
  if (vy > GAME_CONFIG.MAX_VELOCITY_Y) {
    vy = GAME_CONFIG.MAX_VELOCITY_Y;
  }

  // 위치 업데이트
  x += vx;
  y += vy;

  // 좌우 벽 충돌 - 벽타기(삼각뛰기) 가능
  if (x - radius < 0) {
    x = radius;
    // 벽에 닿을 때 반대 방향으로 튕김
    if (input.right) {
      vx = GAME_CONFIG.MOVE_SPEED;
    } else {
      vx = -vx * 0.5;
    }
  } else if (x + radius > stageWidth) {
    x = stageWidth - radius;
    if (input.left) {
      vx = -GAME_CONFIG.MOVE_SPEED;
    } else {
      vx = -vx * 0.5;
    }
  }

  // 천장 충돌
  if (y - radius < 0) {
    y = radius;
    vy = Math.abs(vy) * 0.5; // 천장에서는 약하게 튕김
  }

  // 바닥 낙사 - 죽음! (바닥은 없고 블록에서만 바운스)
  if (y - radius > stageHeight) {
    // 화면 아래로 완전히 벗어나면 사망
    return {
      ...ball,
      x,
      y,
      vx,
      vy,
      isAlive: false,
    };
  }

  return {
    ...ball,
    x,
    y,
    vx,
    vy,
  };
}

/**
 * 블록 위에서 바운스 (일정 높이)
 */
export function bounceOnBlock(ball: BallState): BallState {
  return {
    ...ball,
    vy: GAME_CONFIG.BOUNCE_VELOCITY,
  };
}

/**
 * 점프 블록에서 높이 바운스
 */
export function bounceOnJumpBlock(ball: BallState): BallState {
  return {
    ...ball,
    vy: GAME_CONFIG.BOUNCE_VELOCITY * GAME_CONFIG.JUMP_BOOST,
  };
}

// Alias for backward compatibility
export const applyJumpBoost = bounceOnJumpBlock;

/**
 * 화살표 블록 - 특정 방향으로 발사
 */
export function applyForce(
  ball: BallState,
  direction: 'up' | 'down' | 'left' | 'right'
): BallState {
  const speed = GAME_CONFIG.ARROW_SPEED;

  switch (direction) {
    case 'up':
      return { ...ball, vy: -speed };
    case 'down':
      return { ...ball, vy: speed };
    case 'left':
      return { ...ball, vx: -speed };
    case 'right':
      return { ...ball, vx: speed };
  }
}
