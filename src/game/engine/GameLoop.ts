import { GameState, GameStatus, InputState, Block, GAME_CONFIG } from '../types';
import { updateBallPhysics } from './Physics';
import { handleCollisions } from './Collision';

/**
 * 게임 상태를 한 프레임 업데이트합니다
 */
export function updateGameState(
  state: GameState,
  input: InputState,
  deltaTime: number
): GameState {
  if (state.status !== 'playing') {
    return state;
  }

  // 1. 물리 업데이트
  let ball = updateBallPhysics(
    state.ball,
    input,
    state.stageSize.width,
    state.stageSize.height
  );

  // 2. 충돌 처리
  const collisionResult = handleCollisions(ball, state.blocks, state.exit);
  ball = collisionResult.ball;
  const blocks = collisionResult.blocks;

  // 3. 게임 상태 결정
  let status: GameStatus = state.status;
  let deathCount = state.deathCount;

  if (collisionResult.isCleared) {
    status = 'cleared';
  } else if (collisionResult.isDead || !ball.isAlive) {
    // 폭탄 충돌 또는 바닥 낙사
    status = 'dead';
    deathCount += 1;
  }

  // 4. 경과 시간 업데이트
  const elapsedTime = state.elapsedTime + deltaTime;

  return {
    ...state,
    status,
    ball,
    blocks,
    elapsedTime,
    deathCount,
  };
}

/**
 * 스테이지를 초기화합니다
 */
export function initializeStage(
  stageData: {
    width: number;
    height: number;
    startPosition: { x: number; y: number };
    exit: { x: number; y: number; width: number; height: number };
    blocks: Omit<Block, 'id' | 'isActive'>[];
  },
  stageNumber: number
): GameState {
  // 블록에 ID와 활성 상태 추가
  const blocks: Block[] = stageData.blocks.map((block, index) => ({
    ...block,
    id: `block-${index}`,
    isActive: true,
  }));

  return {
    status: 'ready',
    currentStage: stageNumber,
    ball: {
      x: stageData.startPosition.x,
      y: stageData.startPosition.y,
      vx: 0,
      vy: 0,
      radius: GAME_CONFIG.BALL_RADIUS,
      isAlive: true,
    },
    blocks,
    exit: stageData.exit,
    stageSize: {
      width: stageData.width,
      height: stageData.height,
    },
    elapsedTime: 0,
    deathCount: 0,
  };
}

/**
 * 스테이지를 재시작합니다 (죽었을 때)
 */
export function restartStage(state: GameState, startPosition: { x: number; y: number }): GameState {
  // 블록 상태 초기화
  const blocks = state.blocks.map((block) => ({
    ...block,
    isActive: true,
  }));

  return {
    ...state,
    status: 'playing',
    ball: {
      x: startPosition.x,
      y: startPosition.y,
      vx: 0,
      vy: 0,
      radius: GAME_CONFIG.BALL_RADIUS,
      isAlive: true,
    },
    blocks,
    elapsedTime: 0,
  };
}
