import { describe, it, expect } from 'vitest';
import {
  updateBallPhysics,
  bounceOnBlock,
  bounceOnJumpBlock,
  applyForce,
} from '../Physics';
import { BallState, InputState, GAME_CONFIG } from '../../types';

/**
 * Physics 엔진 테스트
 * - 중력, 바운스, 이동, 벽 충돌 등 핵심 물리 로직 검증
 */

const createBall = (overrides?: Partial<BallState>): BallState => ({
  x: 100,
  y: 100,
  vx: 0,
  vy: 0,
  radius: GAME_CONFIG.BALL_RADIUS,
  isAlive: true,
  ...overrides,
});

const noInput: InputState = { left: false, right: false };
const leftInput: InputState = { left: true, right: false };
const rightInput: InputState = { left: false, right: true };

describe('updateBallPhysics', () => {
  const stageWidth = 360;
  const stageHeight = 480;

  describe('중력', () => {
    it('매 프레임 중력이 적용되어야 함', () => {
      const ball = createBall({ vy: 0 });
      const result = updateBallPhysics(ball, noInput, stageWidth, stageHeight);

      expect(result.vy).toBe(GAME_CONFIG.GRAVITY);
    });

    it('낙하 속도가 최대 속도를 초과하지 않아야 함', () => {
      const ball = createBall({ vy: GAME_CONFIG.MAX_VELOCITY_Y + 10 });
      const result = updateBallPhysics(ball, noInput, stageWidth, stageHeight);

      expect(result.vy).toBeLessThanOrEqual(GAME_CONFIG.MAX_VELOCITY_Y);
    });
  });

  describe('좌우 이동', () => {
    it('왼쪽 입력 시 왼쪽으로 이동해야 함', () => {
      const ball = createBall({ vx: 0 });
      const result = updateBallPhysics(ball, leftInput, stageWidth, stageHeight);

      expect(result.vx).toBe(-GAME_CONFIG.MOVE_SPEED);
    });

    it('오른쪽 입력 시 오른쪽으로 이동해야 함', () => {
      const ball = createBall({ vx: 0 });
      const result = updateBallPhysics(ball, rightInput, stageWidth, stageHeight);

      expect(result.vx).toBe(GAME_CONFIG.MOVE_SPEED);
    });

    it('입력이 없으면 감속해야 함', () => {
      const ball = createBall({ vx: 4 });
      const result = updateBallPhysics(ball, noInput, stageWidth, stageHeight);

      expect(result.vx).toBe(4 * GAME_CONFIG.FRICTION);
    });
  });

  describe('벽 충돌', () => {
    it('왼쪽 벽에서 멈춰야 함', () => {
      const ball = createBall({ x: 0, vx: -5 });
      const result = updateBallPhysics(ball, noInput, stageWidth, stageHeight);

      expect(result.x).toBeGreaterThanOrEqual(ball.radius);
    });

    it('오른쪽 벽에서 멈춰야 함', () => {
      const ball = createBall({ x: stageWidth, vx: 5 });
      const result = updateBallPhysics(ball, noInput, stageWidth, stageHeight);

      expect(result.x).toBeLessThanOrEqual(stageWidth - ball.radius);
    });
  });

  describe('바닥 낙사', () => {
    it('스테이지 아래로 떨어지면 사망해야 함', () => {
      const ball = createBall({ y: stageHeight + GAME_CONFIG.BALL_RADIUS + 10, vy: 5 });
      const result = updateBallPhysics(ball, noInput, stageWidth, stageHeight);

      expect(result.isAlive).toBe(false);
    });
  });

  describe('죽은 공', () => {
    it('죽은 공은 업데이트되지 않아야 함', () => {
      const ball = createBall({ isAlive: false, x: 50, y: 50 });
      const result = updateBallPhysics(ball, rightInput, stageWidth, stageHeight);

      expect(result.x).toBe(ball.x);
      expect(result.y).toBe(ball.y);
    });
  });
});

describe('bounceOnBlock', () => {
  it('일정한 바운스 속도로 튀어야 함', () => {
    const ball = createBall({ vy: 10 });
    const result = bounceOnBlock(ball);

    expect(result.vy).toBe(GAME_CONFIG.BOUNCE_VELOCITY);
  });
});

describe('bounceOnJumpBlock', () => {
  it('점프 블록에서 더 높이 튀어야 함', () => {
    const ball = createBall({ vy: 10 });
    const normalBounce = bounceOnBlock(ball);
    const jumpBounce = bounceOnJumpBlock(ball);

    expect(Math.abs(jumpBounce.vy)).toBeGreaterThan(Math.abs(normalBounce.vy));
    expect(jumpBounce.vy).toBe(GAME_CONFIG.BOUNCE_VELOCITY * GAME_CONFIG.JUMP_BOOST);
  });
});

describe('applyForce (화살표 블록)', () => {
  it('위쪽 화살표는 위로 발사해야 함', () => {
    const ball = createBall();
    const result = applyForce(ball, 'up');

    expect(result.vy).toBe(-GAME_CONFIG.ARROW_SPEED);
  });

  it('아래쪽 화살표는 아래로 발사해야 함', () => {
    const ball = createBall();
    const result = applyForce(ball, 'down');

    expect(result.vy).toBe(GAME_CONFIG.ARROW_SPEED);
  });

  it('왼쪽 화살표는 왼쪽으로 발사해야 함', () => {
    const ball = createBall();
    const result = applyForce(ball, 'left');

    expect(result.vx).toBe(-GAME_CONFIG.ARROW_SPEED);
  });

  it('오른쪽 화살표는 오른쪽으로 발사해야 함', () => {
    const ball = createBall();
    const result = applyForce(ball, 'right');

    expect(result.vx).toBe(GAME_CONFIG.ARROW_SPEED);
  });
});

describe('물리 계산 검증', () => {
  it('일반 바운스 최대 높이가 약 106px이어야 함', () => {
    // v^2 = 2 * g * h → h = v^2 / (2 * g)
    const bounceVelocity = Math.abs(GAME_CONFIG.BOUNCE_VELOCITY);
    const gravity = GAME_CONFIG.GRAVITY;
    const maxHeight = (bounceVelocity ** 2) / (2 * gravity);

    expect(maxHeight).toBeCloseTo(106.67, 0);
  });

  it('점프 블록 바운스 최대 높이가 약 180px보다 커야 함', () => {
    const jumpVelocity = Math.abs(GAME_CONFIG.BOUNCE_VELOCITY * GAME_CONFIG.JUMP_BOOST);
    const gravity = GAME_CONFIG.GRAVITY;
    const maxHeight = (jumpVelocity ** 2) / (2 * gravity);

    expect(maxHeight).toBeGreaterThan(180);
  });

  it('화살표 블록 최대 높이가 약 166px이어야 함', () => {
    const arrowSpeed = GAME_CONFIG.ARROW_SPEED;
    const gravity = GAME_CONFIG.GRAVITY;
    const maxHeight = (arrowSpeed ** 2) / (2 * gravity);

    expect(maxHeight).toBeCloseTo(166.67, 0);
  });
});
