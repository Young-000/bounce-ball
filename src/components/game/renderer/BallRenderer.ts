import { BallState } from '../../../game/types';

/**
 * 공 색상 정의 (네온 그린)
 */
const BALL_COLORS = {
  main: '#00ff88',
  light: '#44ffaa',
  dark: '#00cc66',
  outline: '#008844',
  highlight: 'rgba(255, 255, 255, 0.9)',
  glow: '#00ff8866',
};

/**
 * 공 글로우 효과 (네온)
 */
function drawBallGlow(
  ctx: CanvasRenderingContext2D,
  ball: BallState
): void {
  const { x, y, radius } = ball;

  // 네온 글로우
  ctx.shadowColor = BALL_COLORS.glow;
  ctx.shadowBlur = 15;

  ctx.beginPath();
  ctx.arc(x, y, radius + 2, 0, Math.PI * 2);
  ctx.fillStyle = BALL_COLORS.glow;
  ctx.fill();

  ctx.shadowBlur = 0;
}

/**
 * 픽셀 스타일 공
 */
function drawPixelBall(
  ctx: CanvasRenderingContext2D,
  ball: BallState
): void {
  const { x, y, radius } = ball;
  const px = 1; // 픽셀 크기

  // 네온 글로우 효과
  ctx.shadowColor = '#00ff88';
  ctx.shadowBlur = 12;

  // 공 본체 (원형 - 작은 반경이므로 그대로)
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = BALL_COLORS.main;
  ctx.fill();

  // 외곽선
  ctx.strokeStyle = BALL_COLORS.outline;
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.shadowBlur = 0;

  // 하이라이트 (픽셀 스타일)
  ctx.fillStyle = BALL_COLORS.highlight;
  ctx.fillRect(
    Math.round(x - radius * 0.4),
    Math.round(y - radius * 0.4),
    px * 2,
    px * 2
  );
}

/**
 * 공 그림자
 */
function drawBallShadow(
  ctx: CanvasRenderingContext2D,
  ball: BallState,
  groundY: number
): void {
  const distanceFromGround = groundY - (ball.y + ball.radius);
  const maxDistance = 200;
  const shadowRatio = Math.max(0, 1 - distanceFromGround / maxDistance);

  if (shadowRatio <= 0) return;

  const shadowRadius = ball.radius * (0.5 + shadowRatio * 0.5);
  const shadowY = groundY - 2;

  // 픽셀 스타일 그림자 (타원 대신 직사각형)
  ctx.fillStyle = `rgba(0, 255, 136, ${0.2 * shadowRatio})`;
  ctx.fillRect(
    ball.x - shadowRadius,
    shadowY - 1,
    shadowRadius * 2,
    2
  );
}

/**
 * 공 렌더링 메인 함수
 */
export function renderBall(
  ctx: CanvasRenderingContext2D,
  ball: BallState,
  groundY: number
): void {
  if (!ball.isAlive) return;

  // 1. 그림자
  drawBallShadow(ctx, ball, groundY);

  // 2. 글로우 효과
  drawBallGlow(ctx, ball);

  // 3. 공 본체 (픽셀 스타일)
  drawPixelBall(ctx, ball);
}

/**
 * 죽은 공 (폭발 효과)
 */
export function renderDeadBall(
  ctx: CanvasRenderingContext2D,
  ball: BallState,
  progress: number // 0 ~ 1
): void {
  const { x, y, radius } = ball;

  // 픽셀 폭발 효과
  const expandedRadius = radius * (1 + progress * 3);
  const opacity = 1 - progress;

  ctx.shadowColor = '#ff2244';
  ctx.shadowBlur = 15 * opacity;

  ctx.beginPath();
  ctx.arc(x, y, expandedRadius, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255, 34, 68, ${opacity})`;
  ctx.fill();

  ctx.shadowBlur = 0;
}
