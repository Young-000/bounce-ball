/**
 * 배경 렌더러
 * - 그라데이션 배경
 * - 그리드 패턴
 * - 별/파티클 효과
 */

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  twinkleSpeed: number;
}

// 별 캐시
let stars: Star[] = [];
let lastWidth = 0;
let lastHeight = 0;

/**
 * 별 초기화
 */
function initStars(width: number, height: number): void {
  if (width === lastWidth && height === lastHeight && stars.length > 0) return;

  lastWidth = width;
  lastHeight = height;
  stars = [];

  const count = Math.floor((width * height) / 3000);
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.01,
    });
  }
}

/**
 * 그라데이션 배경 그리기
 */
function drawGradientBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#0f0c29');
  gradient.addColorStop(0.5, '#302b63');
  gradient.addColorStop(1, '#24243e');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

/**
 * 그리드 패턴 그리기
 */
function drawGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  const gridSize = 40;

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 1;

  // 세로선
  for (let x = 0; x <= width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // 가로선
  for (let y = 0; y <= height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

/**
 * 반짝이는 별 그리기
 */
function drawStars(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
): void {
  initStars(width, height);

  stars.forEach((star) => {
    const twinkle = Math.sin(time * star.twinkleSpeed) * 0.3 + 0.7;
    const alpha = star.alpha * twinkle;

    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });
}

/**
 * 위험 구역 (바닥) 표시
 */
function drawDangerZone(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
): void {
  const dangerHeight = 30;
  const y = height - dangerHeight;

  // 펄스 효과
  const pulse = Math.sin(time * 0.005) * 0.2 + 0.3;

  // 그라데이션 위험 표시
  const gradient = ctx.createLinearGradient(0, y, 0, height);
  gradient.addColorStop(0, `rgba(255, 0, 0, 0)`);
  gradient.addColorStop(0.5, `rgba(255, 0, 0, ${pulse * 0.5})`);
  gradient.addColorStop(1, `rgba(255, 0, 0, ${pulse})`);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, y, width, dangerHeight);

  // 경고 줄무늬
  ctx.strokeStyle = `rgba(255, 200, 0, ${pulse * 0.5})`;
  ctx.lineWidth = 2;
  ctx.setLineDash([10, 10]);
  ctx.beginPath();
  ctx.moveTo(0, y + 5);
  ctx.lineTo(width, y + 5);
  ctx.stroke();
  ctx.setLineDash([]);
}

/**
 * 배경 렌더링 메인 함수
 */
export function renderBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
): void {
  // 1. 그라데이션 배경
  drawGradientBackground(ctx, width, height);

  // 2. 그리드
  drawGrid(ctx, width, height);

  // 3. 별
  drawStars(ctx, width, height, time);

  // 4. 위험 구역 (바닥)
  drawDangerZone(ctx, width, height, time);
}
