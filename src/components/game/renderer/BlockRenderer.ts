import { Block, BlockType } from '../../../game/types';

/**
 * 블록 색상 정의 (네온 레트로 픽셀)
 */
const BLOCK_COLORS: Record<BlockType, {
  main: string;
  light: string;
  dark: string;
  border: string;
  glow?: string;
}> = {
  normal: {
    main: '#5a7a8a',
    light: '#7a9aaa',
    dark: '#3a5a6a',
    border: '#2a3a4a',
  },
  jump: {
    main: '#ffee00',
    light: '#ffff44',
    dark: '#ccaa00',
    border: '#886600',
    glow: '#ffee0066',
  },
  breakable: {
    main: '#8b6914',
    light: '#ab8934',
    dark: '#5b4904',
    border: '#3b2904',
  },
  arrow: {
    main: '#00aaff',
    light: '#44ccff',
    dark: '#0088cc',
    border: '#004488',
    glow: '#00aaff66',
  },
  bomb: {
    main: '#ff2244',
    light: '#ff4466',
    dark: '#cc0022',
    border: '#880011',
    glow: '#ff224466',
  },
};

/**
 * 픽셀 스타일 블록 (8bit 느낌)
 */
function drawPixelBlock(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  colors: typeof BLOCK_COLORS.normal
): void {
  // 픽셀 크기
  const px = 2;

  // 1. 메인 색상 (베이스)
  ctx.fillStyle = colors.main;
  ctx.fillRect(x, y, width, height);

  // 2. 하이라이트 (상단/좌측 - 밝은 색) - 픽셀 단위
  ctx.fillStyle = colors.light;
  ctx.fillRect(x, y, width, px * 2);
  ctx.fillRect(x, y, px * 2, height);

  // 3. 그림자 (하단/우측 - 어두운 색)
  ctx.fillStyle = colors.dark;
  ctx.fillRect(x, y + height - px * 2, width, px * 2);
  ctx.fillRect(x + width - px * 2, y, px * 2, height);

  // 4. 코너 어두운 부분
  ctx.fillStyle = colors.border;
  ctx.fillRect(x + width - px * 2, y + height - px * 2, px * 2, px * 2);

  // 5. 외곽선
  ctx.strokeStyle = colors.border;
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 0.5, y + 0.5, width - 1, height - 1);
}

/**
 * 점프 블록 (스프링 - 네온 옐로우)
 */
function drawJumpBlock(
  ctx: CanvasRenderingContext2D,
  block: Block,
  time: number
): void {
  const colors = BLOCK_COLORS.jump;

  // 펄스 효과
  const pulse = Math.sin(time * 0.008) * 1.5;

  // 글로우
  if (colors.glow) {
    ctx.shadowColor = colors.glow;
    ctx.shadowBlur = 10 + pulse * 2;
  }

  drawPixelBlock(ctx, block.x, block.y, block.width, block.height, colors);

  ctx.shadowBlur = 0;

  // 픽셀 화살표 심볼 (8bit 스타일)
  const centerX = block.x + block.width / 2;
  const centerY = block.y + block.height / 2;

  ctx.fillStyle = '#000000';
  // 위쪽 삼각형 (픽셀)
  const px = 2;
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(centerX - (3 - i) * px, centerY - 2 + i * px, (6 - i * 2) * px, px);
  }
}

/**
 * 부서지는 블록 (균열 패턴)
 */
function drawBreakableBlock(
  ctx: CanvasRenderingContext2D,
  block: Block
): void {
  const colors = BLOCK_COLORS.breakable;

  drawPixelBlock(ctx, block.x, block.y, block.width, block.height, colors);

  // 픽셀 균열 패턴
  ctx.fillStyle = '#1a1a1a';
  const px = 2;

  // 균열 라인들
  ctx.fillRect(block.x + block.width * 0.3, block.y, px, block.height * 0.4);
  ctx.fillRect(block.x + block.width * 0.3 - px, block.y + block.height * 0.4, px * 3, px);
  ctx.fillRect(block.x + block.width * 0.25, block.y + block.height * 0.4, px, block.height * 0.6);

  ctx.fillRect(block.x + block.width * 0.7, block.y + block.height * 0.2, px, block.height * 0.5);
  ctx.fillRect(block.x + block.width * 0.65, block.y + block.height * 0.7, px * 3, px);
}

/**
 * 화살표 블록 (방향 - 네온 블루)
 */
function drawArrowBlock(
  ctx: CanvasRenderingContext2D,
  block: Block,
  time: number
): void {
  const colors = BLOCK_COLORS.arrow;

  // 글로우
  const pulse = Math.sin(time * 0.006) * 2;
  if (colors.glow) {
    ctx.shadowColor = colors.glow;
    ctx.shadowBlur = 8 + pulse;
  }

  drawPixelBlock(ctx, block.x, block.y, block.width, block.height, colors);

  ctx.shadowBlur = 0;

  // 픽셀 화살표 (방향)
  const centerX = block.x + block.width / 2;
  const centerY = block.y + block.height / 2;
  const direction = block.direction || 'up';
  const px = 2;

  ctx.fillStyle = '#ffffff';

  // 화살표 픽셀 아트
  switch (direction) {
    case 'up':
      for (let i = 0; i < 3; i++) {
        ctx.fillRect(centerX - (2 - i) * px, centerY - 3 * px + i * px, (4 - i * 2) * px, px);
      }
      ctx.fillRect(centerX - px, centerY, px * 2, px * 3);
      break;
    case 'down':
      for (let i = 0; i < 3; i++) {
        ctx.fillRect(centerX - (2 - i) * px, centerY + 1 * px + i * px, (4 - i * 2) * px, px);
      }
      ctx.fillRect(centerX - px, centerY - px * 3, px * 2, px * 3);
      break;
    case 'left':
      for (let i = 0; i < 3; i++) {
        ctx.fillRect(centerX - 3 * px + i * px, centerY - (2 - i) * px, px, (4 - i * 2) * px);
      }
      ctx.fillRect(centerX, centerY - px, px * 3, px * 2);
      break;
    case 'right':
      for (let i = 0; i < 3; i++) {
        ctx.fillRect(centerX + 1 * px + i * px, centerY - (2 - i) * px, px, (4 - i * 2) * px);
      }
      ctx.fillRect(centerX - px * 3, centerY - px, px * 3, px * 2);
      break;
  }
}

/**
 * 폭탄 블록 (위험 - 네온 레드)
 */
function drawBombBlock(
  ctx: CanvasRenderingContext2D,
  block: Block,
  time: number
): void {
  const colors = BLOCK_COLORS.bomb;

  // 펄스 효과
  const pulse = 0.6 + Math.sin(time * 0.015) * 0.4;

  // 글로우
  if (colors.glow) {
    ctx.shadowColor = colors.glow;
    ctx.shadowBlur = 12 * pulse;
  }

  ctx.globalAlpha = pulse;
  drawPixelBlock(ctx, block.x, block.y, block.width, block.height, colors);
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;

  // 픽셀 해골 심볼
  const centerX = block.x + block.width / 2;
  const centerY = block.y + block.height / 2;
  const px = 2;

  ctx.fillStyle = '#ffffff';

  // 해골 머리
  ctx.fillRect(centerX - px * 2, centerY - px * 3, px * 4, px * 4);
  // 눈
  ctx.fillStyle = '#000000';
  ctx.fillRect(centerX - px * 1.5, centerY - px * 2, px, px);
  ctx.fillRect(centerX + px * 0.5, centerY - px * 2, px, px);
  // 이빨
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(centerX - px, centerY + px, px * 2, px);
}

/**
 * 일반 블록
 */
function drawNormalBlock(
  ctx: CanvasRenderingContext2D,
  block: Block
): void {
  const colors = BLOCK_COLORS.normal;
  drawPixelBlock(ctx, block.x, block.y, block.width, block.height, colors);
}

/**
 * 블록 렌더링 메인 함수
 */
export function renderBlock(
  ctx: CanvasRenderingContext2D,
  block: Block,
  time: number
): void {
  if (!block.isActive) return;

  switch (block.type) {
    case 'normal':
      drawNormalBlock(ctx, block);
      break;
    case 'jump':
      drawJumpBlock(ctx, block, time);
      break;
    case 'breakable':
      drawBreakableBlock(ctx, block);
      break;
    case 'arrow':
      drawArrowBlock(ctx, block, time);
      break;
    case 'bomb':
      drawBombBlock(ctx, block, time);
      break;
  }
}

/**
 * 모든 블록 렌더링
 */
export function renderBlocks(
  ctx: CanvasRenderingContext2D,
  blocks: Block[],
  time: number
): void {
  blocks.forEach((block) => renderBlock(ctx, block, time));
}
