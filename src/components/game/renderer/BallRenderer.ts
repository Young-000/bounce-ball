import { BallState } from '../../../game/types';

/**
 * 공 색상 정의
 */
const BALL_COLORS = {
  main: '#ffe66d',
  light: '#ffed4e',
  dark: '#ffd43b',
  outline: '#ffc107',
  highlight: 'rgba(255, 255, 255, 0.7)',
  shadow: 'rgba(255, 169, 77, 0.5)',
};

/**
 * 공 그림자를 그립니다
 */
function drawBallShadow(
  ctx: CanvasRenderingContext2D,
  ball: BallState,
  groundY: number
): void {
  // 바닥과의 거리에 따라 그림자 크기/투명도 조절
  const distanceFromGround = groundY - (ball.y + ball.radius);
  const maxDistance = 200;
  const shadowRatio = Math.max(0, 1 - distanceFromGround / maxDistance);

  if (shadowRatio <= 0) return;

  const shadowRadius = ball.radius * (0.5 + shadowRatio * 0.5);
  const shadowY = groundY - 2;

  // 타원형 그림자
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(
    ball.x,
    shadowY,
    shadowRadius,
    shadowRadius * 0.3,
    0,
    0,
    Math.PI * 2
  );

  // 그라데이션 그림자
  const gradient = ctx.createRadialGradient(
    ball.x, shadowY, 0,
    ball.x, shadowY, shadowRadius
  );
  gradient.addColorStop(0, `rgba(0, 0, 0, ${0.4 * shadowRatio})`);
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.restore();
}

/**
 * 공 글로우 효과
 */
function drawBallGlow(
  ctx: CanvasRenderingContext2D,
  ball: BallState
): void {
  const { x, y, radius } = ball;

  // 외부 글로우
  const glowGradient = ctx.createRadialGradient(x, y, radius, x, y, radius * 2.5);
  glowGradient.addColorStop(0, 'rgba(255, 230, 109, 0.4)');
  glowGradient.addColorStop(0.5, 'rgba(255, 230, 109, 0.1)');
  glowGradient.addColorStop(1, 'rgba(255, 230, 109, 0)');

  ctx.beginPath();
  ctx.arc(x, y, radius * 2.5, 0, Math.PI * 2);
  ctx.fillStyle = glowGradient;
  ctx.fill();
}

/**
 * 공 본체를 그립니다
 */
function drawBallBody(
  ctx: CanvasRenderingContext2D,
  ball: BallState
): void {
  const { x, y, radius } = ball;

  // 1. 메인 공 (그라데이션)
  const gradient = ctx.createRadialGradient(
    x - radius * 0.3, y - radius * 0.3, 0,
    x, y, radius
  );
  gradient.addColorStop(0, BALL_COLORS.light);
  gradient.addColorStop(0.5, BALL_COLORS.main);
  gradient.addColorStop(1, BALL_COLORS.dark);

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();

  // 2. 외곽선 (얇게)
  ctx.strokeStyle = BALL_COLORS.outline;
  ctx.lineWidth = 1;
  ctx.stroke();
}

/**
 * 공 반사광을 그립니다
 */
function drawBallHighlight(
  ctx: CanvasRenderingContext2D,
  ball: BallState
): void {
  const { x, y, radius } = ball;

  // 좌상단 하이라이트
  const highlightX = x - radius * 0.35;
  const highlightY = y - radius * 0.35;
  const highlightRadius = radius * 0.25;

  ctx.beginPath();
  ctx.arc(highlightX, highlightY, highlightRadius, 0, Math.PI * 2);
  ctx.fillStyle = BALL_COLORS.highlight;
  ctx.fill();

  // 작은 하이라이트 추가
  ctx.beginPath();
  ctx.arc(highlightX + radius * 0.15, highlightY + radius * 0.2, highlightRadius * 0.4, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.fill();
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

  // 3. 공 본체
  drawBallBody(ctx, ball);

  // 4. 반사광
  drawBallHighlight(ctx, ball);
}

/**
 * 죽은 공 (폭발 효과용 - 나중에 파티클로 대체 가능)
 */
export function renderDeadBall(
  ctx: CanvasRenderingContext2D,
  ball: BallState,
  progress: number // 0 ~ 1
): void {
  const { x, y, radius } = ball;

  // 폭발 확장 효과
  const expandedRadius = radius * (1 + progress * 2);
  const opacity = 1 - progress;

  ctx.beginPath();
  ctx.arc(x, y, expandedRadius, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255, 107, 107, ${opacity})`;
  ctx.fill();
}
