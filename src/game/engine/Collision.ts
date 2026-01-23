import { BallState, Block, Exit, GAME_CONFIG } from '../types';
import { applyForce, applyJumpBoost } from './Physics';

export interface CollisionResult {
  ball: BallState;
  blocks: Block[];
  isDead: boolean;
  isCleared: boolean;
}

/**
 * 공과 블록의 충돌을 감지하고 처리합니다
 */
export function handleCollisions(
  ball: BallState,
  blocks: Block[],
  exit: Exit
): CollisionResult {
  let updatedBall = { ...ball };
  let updatedBlocks = [...blocks];
  let isDead = false;
  let isCleared = false;

  // 출구 도달 체크
  if (checkExitCollision(ball, exit)) {
    isCleared = true;
    return { ball: updatedBall, blocks: updatedBlocks, isDead, isCleared };
  }

  // 블록 충돌 체크
  for (let i = 0; i < updatedBlocks.length; i++) {
    const block = updatedBlocks[i];
    if (!block.isActive) continue;

    const collision = checkBlockCollision(updatedBall, block);
    if (!collision) continue;

    // 블록 타입별 처리
    switch (block.type) {
      case 'normal':
        updatedBall = resolveBallBlockCollision(updatedBall, block, collision);
        break;

      case 'jump':
        updatedBall = resolveBallBlockCollision(updatedBall, block, collision);
        if (collision.fromTop) {
          updatedBall = applyJumpBoost(updatedBall);
        }
        break;

      case 'breakable':
        updatedBall = resolveBallBlockCollision(updatedBall, block, collision);
        if (collision.fromTop) {
          updatedBlocks[i] = { ...block, isActive: false };
        }
        break;

      case 'arrow':
        updatedBall = resolveBallBlockCollision(updatedBall, block, collision);
        if (block.direction) {
          updatedBall = applyForce(updatedBall, block.direction);
        }
        break;

      case 'bomb':
        isDead = true;
        updatedBall = { ...updatedBall, isAlive: false };
        break;
    }
  }

  return { ball: updatedBall, blocks: updatedBlocks, isDead, isCleared };
}

interface BlockCollision {
  fromTop: boolean;
  fromBottom: boolean;
  fromLeft: boolean;
  fromRight: boolean;
}

/**
 * 공과 블록의 충돌 여부 및 방향을 확인합니다
 */
function checkBlockCollision(ball: BallState, block: Block): BlockCollision | null {
  const { x, y, radius } = ball;
  const { x: bx, y: by, width, height } = block;

  // AABB 충돌 체크 (공을 사각형으로 근사)
  const ballLeft = x - radius;
  const ballRight = x + radius;
  const ballTop = y - radius;
  const ballBottom = y + radius;

  const blockRight = bx + width;
  const blockBottom = by + height;

  // 충돌 없음
  if (
    ballRight < bx ||
    ballLeft > blockRight ||
    ballBottom < by ||
    ballTop > blockBottom
  ) {
    return null;
  }

  // 충돌 방향 계산
  const overlapLeft = ballRight - bx;
  const overlapRight = blockRight - ballLeft;
  const overlapTop = ballBottom - by;
  const overlapBottom = blockBottom - ballTop;

  const minOverlapX = Math.min(overlapLeft, overlapRight);
  const minOverlapY = Math.min(overlapTop, overlapBottom);

  // 가장 작은 겹침 방향이 충돌 방향
  if (minOverlapY < minOverlapX) {
    return {
      fromTop: overlapTop < overlapBottom,
      fromBottom: overlapTop >= overlapBottom,
      fromLeft: false,
      fromRight: false,
    };
  } else {
    return {
      fromTop: false,
      fromBottom: false,
      fromLeft: overlapLeft < overlapRight,
      fromRight: overlapLeft >= overlapRight,
    };
  }
}

/**
 * 공과 블록의 충돌을 해결합니다 (위치 보정 + 고정 바운스)
 * BOUND 스타일: 위에서 밟으면 항상 일정 높이로 튀어오름
 */
function resolveBallBlockCollision(
  ball: BallState,
  block: Block,
  collision: BlockCollision
): BallState {
  let { x, y, vx, vy } = ball;
  const { radius } = ball;

  if (collision.fromTop) {
    // 블록 위에서 착지 - 고정 바운스 속도로 튀어오름
    y = block.y - radius;
    vy = GAME_CONFIG.BOUNCE_VELOCITY;
  } else if (collision.fromBottom) {
    // 블록 아래에서 머리 부딪힘 - 약하게 튕김
    y = block.y + block.height + radius;
    vy = Math.abs(vy) * 0.3;
  } else if (collision.fromLeft) {
    // 블록 왼쪽에서 부딪힘
    x = block.x - radius;
    vx = -Math.abs(vx) * 0.5;
  } else if (collision.fromRight) {
    // 블록 오른쪽에서 부딪힘
    x = block.x + block.width + radius;
    vx = Math.abs(vx) * 0.5;
  }

  return { ...ball, x, y, vx, vy };
}

/**
 * 공이 출구에 도달했는지 확인합니다
 */
function checkExitCollision(ball: BallState, exit: Exit): boolean {
  const { x, y } = ball;
  const ballCenterX = x;
  const ballCenterY = y;

  // 공의 중심이 출구 영역 안에 있는지 확인
  return (
    ballCenterX > exit.x &&
    ballCenterX < exit.x + exit.width &&
    ballCenterY > exit.y &&
    ballCenterY < exit.y + exit.height
  );
}
