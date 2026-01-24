import { describe, it, expect } from 'vitest';
import { handleCollisions } from '../Collision';
import { BallState, Block, Exit, GAME_CONFIG } from '../../types';

// 테스트용 기본 공 상태 생성
function createBall(overrides: Partial<BallState> = {}): BallState {
  return {
    x: 100,
    y: 100,
    vx: 0,
    vy: 5,
    radius: GAME_CONFIG.BALL_RADIUS,
    isAlive: true,
    ...overrides,
  };
}

// 테스트용 블록 생성
let blockIdCounter = 0;
function createBlock(overrides: Partial<Block> = {}): Block {
  return {
    id: `test-block-${blockIdCounter++}`,
    x: 80,
    y: 110,
    width: 40,
    height: 10,
    type: 'normal',
    isActive: true,
    ...overrides,
  };
}

// 테스트용 출구 생성
function createExit(overrides: Partial<Exit> = {}): Exit {
  return {
    x: 200,
    y: 50,
    width: 30,
    height: 30,
    ...overrides,
  };
}

describe('Collision', () => {
  describe('handleCollisions', () => {
    describe('출구 충돌', () => {
      it('공이 출구에 도달하면 isCleared가 true가 된다', () => {
        const ball = createBall({ x: 215, y: 65 });
        const exit = createExit();
        const blocks: Block[] = [];

        const result = handleCollisions(ball, blocks, exit);

        expect(result.isCleared).toBe(true);
        expect(result.isDead).toBe(false);
      });

      it('공이 출구 밖에 있으면 isCleared가 false다', () => {
        const ball = createBall({ x: 100, y: 100 });
        const exit = createExit();
        const blocks: Block[] = [];

        const result = handleCollisions(ball, blocks, exit);

        expect(result.isCleared).toBe(false);
      });
    });

    describe('블록 충돌 - normal', () => {
      it('위에서 블록을 밟으면 BOUNCE_VELOCITY로 튀어오른다', () => {
        // 공이 블록 위에 겹쳐있는 상태 (충돌 중)
        const radius = GAME_CONFIG.BALL_RADIUS;
        const block = createBlock({ x: 80, y: 100, width: 40, height: 10 });
        const ball = createBall({ x: 100, y: 100 - radius + 2, vy: 5 }); // 블록 위에서 2픽셀 겹침

        const result = handleCollisions(ball, [block], createExit());

        expect(result.ball.vy).toBe(GAME_CONFIG.BOUNCE_VELOCITY);
      });

      it('비활성 블록은 충돌하지 않는다', () => {
        const radius = GAME_CONFIG.BALL_RADIUS;
        const block = createBlock({ x: 80, y: 100, width: 40, height: 10, isActive: false });
        const ball = createBall({ x: 100, y: 100 - radius + 2, vy: 5 });

        const result = handleCollisions(ball, [block], createExit());

        expect(result.ball.vy).toBe(5); // 속도 변화 없음
      });
    });

    describe('블록 충돌 - jump', () => {
      it('점프 블록 위에서 밟으면 추가 점프 부스트가 적용된다', () => {
        const radius = GAME_CONFIG.BALL_RADIUS;
        const jumpBlock = createBlock({ x: 80, y: 100, width: 40, height: 10, type: 'jump' });
        const ball = createBall({ x: 100, y: 100 - radius + 2, vy: 5 });

        const result = handleCollisions(ball, [jumpBlock], createExit());

        // 점프 부스트가 적용되어 더 높이 튀어오름
        expect(result.ball.vy).toBe(GAME_CONFIG.BOUNCE_VELOCITY * GAME_CONFIG.JUMP_BOOST);
      });
    });

    describe('블록 충돌 - breakable', () => {
      it('부서지는 블록을 위에서 밟으면 비활성화된다', () => {
        const radius = GAME_CONFIG.BALL_RADIUS;
        const breakableBlock = createBlock({ x: 80, y: 100, width: 40, height: 10, type: 'breakable' });
        const ball = createBall({ x: 100, y: 100 - radius + 2, vy: 5 });

        const result = handleCollisions(ball, [breakableBlock], createExit());

        expect(result.blocks[0].isActive).toBe(false);
      });

      it('부서지는 블록을 옆에서 부딪히면 비활성화되지 않는다', () => {
        // 공이 블록의 왼쪽에서 접근 (세로 중앙에 위치)
        const radius = GAME_CONFIG.BALL_RADIUS;
        const breakableBlock = createBlock({ x: 80, y: 100, width: 40, height: 20, type: 'breakable' });
        const ball = createBall({ x: 80 - radius + 2, y: 110, vx: 5, vy: 0 }); // 블록 중앙 높이에서 옆으로 접근

        const result = handleCollisions(ball, [breakableBlock], createExit());

        expect(result.blocks[0].isActive).toBe(true);
      });
    });

    describe('블록 충돌 - bomb', () => {
      it('폭탄 블록에 닿으면 isDead가 true가 된다', () => {
        const radius = GAME_CONFIG.BALL_RADIUS;
        const bombBlock = createBlock({ x: 80, y: 100, width: 40, height: 10, type: 'bomb' });
        const ball = createBall({ x: 100, y: 100 - radius + 2, vy: 5 });

        const result = handleCollisions(ball, [bombBlock], createExit());

        expect(result.isDead).toBe(true);
        expect(result.ball.isAlive).toBe(false);
      });
    });

    describe('블록 충돌 - arrow', () => {
      it('화살표 블록에 닿으면 방향으로 힘이 가해진다', () => {
        const radius = GAME_CONFIG.BALL_RADIUS;
        const arrowBlock = createBlock({ x: 80, y: 100, width: 40, height: 10, type: 'arrow', direction: 'right' });
        const ball = createBall({ x: 100, y: 100 - radius + 2, vx: 0, vy: 5 });

        const result = handleCollisions(ball, [arrowBlock], createExit());

        expect(result.ball.vx).toBeGreaterThan(0);
      });
    });

    describe('충돌 방향 감지', () => {
      it('아래에서 블록을 부딪히면 vy가 양수(아래쪽)로 바뀐다', () => {
        const radius = GAME_CONFIG.BALL_RADIUS;
        const block = createBlock({ x: 80, y: 100, width: 40, height: 10 });
        // 공이 블록 아래에서 위로 올라오며 충돌
        const ball = createBall({ x: 100, y: 110 + radius - 2, vy: -5 });

        const result = handleCollisions(ball, [block], createExit());

        expect(result.ball.vy).toBeGreaterThan(0);
      });

      it('왼쪽에서 블록을 부딪히면 vx가 음수(왼쪽)로 바뀐다', () => {
        const radius = GAME_CONFIG.BALL_RADIUS;
        // 블록 높이를 충분히 키워서 세로 충돌이 아닌 가로 충돌이 되도록
        const block = createBlock({ x: 100, y: 90, width: 40, height: 30 });
        // 공이 블록 왼쪽에서 오른쪽으로 이동하며 충돌
        const ball = createBall({ x: 100 - radius + 2, y: 105, vx: 5, vy: 0 });

        const result = handleCollisions(ball, [block], createExit());

        expect(result.ball.vx).toBeLessThan(0);
      });

      it('오른쪽에서 블록을 부딪히면 vx가 양수(오른쪽)로 바뀐다', () => {
        const radius = GAME_CONFIG.BALL_RADIUS;
        // 블록 높이를 충분히 키워서 세로 충돌이 아닌 가로 충돌이 되도록
        const block = createBlock({ x: 80, y: 90, width: 40, height: 30 });
        // 공이 블록 오른쪽에서 왼쪽으로 이동하며 충돌 (blockRight = 120)
        const ball = createBall({ x: 120 + radius - 2, y: 105, vx: -5, vy: 0 });

        const result = handleCollisions(ball, [block], createExit());

        expect(result.ball.vx).toBeGreaterThan(0);
      });
    });

    describe('다중 블록 충돌', () => {
      it('여러 블록이 있을 때 첫 번째 충돌하는 블록만 처리된다', () => {
        const radius = GAME_CONFIG.BALL_RADIUS;
        const block1 = createBlock({ type: 'normal', x: 80, y: 100, width: 40, height: 10 });
        const block2 = createBlock({ type: 'bomb', x: 80, y: 150, width: 40, height: 10 });
        const ball = createBall({ x: 100, y: 100 - radius + 2, vy: 5 });

        const result = handleCollisions(ball, [block1, block2], createExit());

        expect(result.isDead).toBe(false); // 폭탄에 닿지 않음
      });
    });
  });
});
