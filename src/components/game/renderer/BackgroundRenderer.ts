/**
 * 배경 렌더러 (빈티지 픽셀 / CRT 스타일)
 */

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  twinkleSpeed: number;
  color: string;
}

// 별 캐시
let stars: Star[] = [];
let lastWidth = 0;
let lastHeight = 0;

// 네온 색상 팔레트
const NEON_COLORS = ['#00ff88', '#00aaff', '#aa44ff', '#ffee00', '#ff6600'];

/**
 * 별 초기화 (픽셀 스타일)
 */
function initStars(width: number, height: number): void {
  if (width === lastWidth && height === lastHeight && stars.length > 0) return;

  lastWidth = width;
  lastHeight = height;
  stars = [];

  const count = Math.floor((width * height) / 4000);
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.floor(Math.random() * width / 2) * 2, // 픽셀 그리드에 맞춤
      y: Math.floor(Math.random() * height / 2) * 2,
      size: Math.random() > 0.7 ? 2 : 1,
      alpha: Math.random() * 0.6 + 0.4,
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      color: NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)],
    });
  }
}

/**
 * 어두운 배경 (CRT 느낌)
 */
function drawDarkBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  // 매우 어두운 배경
  ctx.fillStyle = '#0a0a14';
  ctx.fillRect(0, 0, width, height);

  // 미묘한 그라데이션 (상단이 약간 밝음)
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, 'rgba(20, 20, 40, 0.5)');
  gradient.addColorStop(1, 'rgba(5, 5, 15, 0.8)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

/**
 * 픽셀 그리드 패턴
 */
function drawPixelGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  const gridSize = 16; // 16px 그리드

  ctx.strokeStyle = 'rgba(0, 170, 255, 0.05)';
  ctx.lineWidth = 1;

  // 세로선
  for (let x = 0; x <= width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, height);
    ctx.stroke();
  }

  // 가로선
  for (let y = 0; y <= height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(width, y + 0.5);
    ctx.stroke();
  }
}

/**
 * CRT 스캔라인 효과
 */
function drawScanlines(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';

  for (let y = 0; y < height; y += 3) {
    ctx.fillRect(0, y, width, 1);
  }
}

/**
 * 반짝이는 픽셀 별 그리기
 */
function drawPixelStars(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
): void {
  initStars(width, height);

  stars.forEach((star) => {
    const twinkle = Math.sin(time * star.twinkleSpeed) * 0.4 + 0.6;
    const alpha = star.alpha * twinkle;

    // 픽셀 별 (사각형)
    ctx.fillStyle = star.color;
    ctx.globalAlpha = alpha;
    ctx.fillRect(star.x, star.y, star.size, star.size);
  });

  ctx.globalAlpha = 1;
}

/**
 * 위험 구역 (바닥) - 네온 레드
 */
function drawDangerZone(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
): void {
  const dangerHeight = 20;
  const y = height - dangerHeight;

  // 펄스 효과
  const pulse = Math.sin(time * 0.008) * 0.3 + 0.5;

  // 위험 구역 네온 효과
  ctx.shadowColor = '#ff2244';
  ctx.shadowBlur = 10 * pulse;

  // 그라데이션 위험 표시
  const gradient = ctx.createLinearGradient(0, y, 0, height);
  gradient.addColorStop(0, 'rgba(255, 34, 68, 0)');
  gradient.addColorStop(0.5, `rgba(255, 34, 68, ${pulse * 0.3})`);
  gradient.addColorStop(1, `rgba(255, 34, 68, ${pulse * 0.6})`);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, y, width, dangerHeight);

  ctx.shadowBlur = 0;

  // 픽셀 경고 패턴
  ctx.fillStyle = `rgba(255, 200, 0, ${pulse * 0.4})`;
  const patternSize = 8;
  for (let x = 0; x < width; x += patternSize * 2) {
    ctx.fillRect(x, y, patternSize, 2);
  }
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
  // 1. 어두운 배경
  drawDarkBackground(ctx, width, height);

  // 2. 픽셀 그리드
  drawPixelGrid(ctx, width, height);

  // 3. 픽셀 별
  drawPixelStars(ctx, width, height, time);

  // 4. 위험 구역 (바닥)
  drawDangerZone(ctx, width, height, time);

  // 5. CRT 스캔라인 (맨 위에)
  drawScanlines(ctx, width, height);
}
