import { Block, BlockType } from '../../../game/types';

/**
 * 블록 색상 정의 (벽돌 감성)
 */
const BLOCK_COLORS: Record<BlockType, {
  main: string;
  light: string;
  dark: string;
  border: string;
}> = {
  normal: {
    main: '#8b7355',
    light: '#a68968',
    dark: '#6b5544',
    border: '#4a3f35',
  },
  jump: {
    main: '#f4a261',
    light: '#ffd89b',
    dark: '#d68f4c',
    border: '#c77b3f',
  },
  breakable: {
    main: '#94a3b8',
    light: '#cbd5e1',
    dark: '#64748b',
    border: '#475569',
  },
  arrow: {
    main: '#4dabf7',
    light: '#74c0fc',
    dark: '#339af0',
    border: '#1c7ed6',
  },
  bomb: {
    main: '#ff6b6b',
    light: '#ff8787',
    dark: '#fa5252',
    border: '#e03131',
  },
};

/**
 * 3D 벽돌 효과로 블록을 그립니다
 */
function drawBrickBlock(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  colors: typeof BLOCK_COLORS.normal
): void {
  const borderWidth = 2;
  const highlightWidth = 3;

  // 1. 메인 색상 (베이스)
  ctx.fillStyle = colors.main;
  ctx.fillRect(x, y, width, height);

  // 2. 하이라이트 (상단/좌측 - 밝은 색)
  ctx.fillStyle = colors.light;
  // 상단
  ctx.fillRect(x, y, width, highlightWidth);
  // 좌측
  ctx.fillRect(x, y, highlightWidth, height);

  // 3. 그림자 (하단/우측 - 어두운 색)
  ctx.fillStyle = colors.dark;
  // 하단
  ctx.fillRect(x, y + height - highlightWidth, width, highlightWidth);
  // 우측
  ctx.fillRect(x + width - highlightWidth, y, highlightWidth, height);

  // 4. 테두리 (모르타르 라인)
  ctx.strokeStyle = colors.border;
  ctx.lineWidth = borderWidth;
  ctx.strokeRect(x + 1, y + 1, width - 2, height - 2);
}

/**
 * 점프 블록 (스프링 효과)
 */
function drawJumpBlock(
  ctx: CanvasRenderingContext2D,
  block: Block,
  time: number
): void {
  const colors = BLOCK_COLORS.jump;

  // 살짝 펄스 효과
  const pulseOffset = Math.sin(time * 0.005) * 2;

  drawBrickBlock(ctx, block.x, block.y - pulseOffset, block.width, block.height + pulseOffset, colors);

  // 위쪽 화살표 심볼
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 12px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('↑↑', block.x + block.width / 2, block.y + block.height / 2);
}

/**
 * 부서지는 블록 (균열 효과)
 */
function drawBreakableBlock(
  ctx: CanvasRenderingContext2D,
  block: Block
): void {
  const colors = BLOCK_COLORS.breakable;

  drawBrickBlock(ctx, block.x, block.y, block.width, block.height, colors);

  // 균열 패턴
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1;
  ctx.beginPath();

  // 대각선 균열
  ctx.moveTo(block.x + block.width * 0.3, block.y);
  ctx.lineTo(block.x + block.width * 0.5, block.y + block.height * 0.5);
  ctx.lineTo(block.x + block.width * 0.4, block.y + block.height);

  ctx.moveTo(block.x + block.width * 0.7, block.y);
  ctx.lineTo(block.x + block.width * 0.6, block.y + block.height * 0.6);
  ctx.lineTo(block.x + block.width * 0.8, block.y + block.height);

  ctx.stroke();
}

/**
 * 화살표 블록 (방향 표시)
 */
function drawArrowBlock(
  ctx: CanvasRenderingContext2D,
  block: Block
): void {
  const colors = BLOCK_COLORS.arrow;

  drawBrickBlock(ctx, block.x, block.y, block.width, block.height, colors);

  // 화살표 그리기
  const centerX = block.x + block.width / 2;
  const centerY = block.y + block.height / 2;
  const arrowSize = Math.min(block.width, block.height) * 0.4;

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();

  const direction = block.direction || 'up';

  switch (direction) {
    case 'up':
      ctx.moveTo(centerX, centerY - arrowSize);
      ctx.lineTo(centerX - arrowSize * 0.6, centerY + arrowSize * 0.3);
      ctx.lineTo(centerX + arrowSize * 0.6, centerY + arrowSize * 0.3);
      break;
    case 'down':
      ctx.moveTo(centerX, centerY + arrowSize);
      ctx.lineTo(centerX - arrowSize * 0.6, centerY - arrowSize * 0.3);
      ctx.lineTo(centerX + arrowSize * 0.6, centerY - arrowSize * 0.3);
      break;
    case 'left':
      ctx.moveTo(centerX - arrowSize, centerY);
      ctx.lineTo(centerX + arrowSize * 0.3, centerY - arrowSize * 0.6);
      ctx.lineTo(centerX + arrowSize * 0.3, centerY + arrowSize * 0.6);
      break;
    case 'right':
      ctx.moveTo(centerX + arrowSize, centerY);
      ctx.lineTo(centerX - arrowSize * 0.3, centerY - arrowSize * 0.6);
      ctx.lineTo(centerX - arrowSize * 0.3, centerY + arrowSize * 0.6);
      break;
  }

  ctx.closePath();
  ctx.fill();
}

/**
 * 폭탄 블록 (위험 표시 + 펄스)
 */
function drawBombBlock(
  ctx: CanvasRenderingContext2D,
  block: Block,
  time: number
): void {
  const colors = BLOCK_COLORS.bomb;

  // 펄스 효과 (투명도)
  const pulse = 0.7 + Math.sin(time * 0.01) * 0.3;

  ctx.globalAlpha = pulse;
  drawBrickBlock(ctx, block.x, block.y, block.width, block.height, colors);
  ctx.globalAlpha = 1;

  // 위험 심볼
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 14px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('☠', block.x + block.width / 2, block.y + block.height / 2);
}

/**
 * 일반 블록
 */
function drawNormalBlock(
  ctx: CanvasRenderingContext2D,
  block: Block
): void {
  const colors = BLOCK_COLORS.normal;
  drawBrickBlock(ctx, block.x, block.y, block.width, block.height, colors);
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
      drawArrowBlock(ctx, block);
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
