import { Exit } from '../../../game/types';

/**
 * 출구 색상 정의
 */
const EXIT_COLORS = {
  main: '#2ec4b6',
  light: '#4fd1c5',
  dark: '#06a09e',
  glow: 'rgba(46, 196, 182, 0.4)',
};

/**
 * 출구 글로우 효과를 그립니다
 */
function drawExitGlow(
  ctx: CanvasRenderingContext2D,
  exit: Exit,
  time: number
): void {
  const centerX = exit.x + exit.width / 2;
  const centerY = exit.y + exit.height / 2;

  // 펄스 효과
  const pulse = 1 + Math.sin(time * 0.003) * 0.2;
  const glowRadius = Math.max(exit.width, exit.height) * pulse;

  // 외부 글로우
  const gradient = ctx.createRadialGradient(
    centerX, centerY, 0,
    centerX, centerY, glowRadius
  );
  gradient.addColorStop(0, 'rgba(46, 196, 182, 0.3)');
  gradient.addColorStop(0.5, 'rgba(46, 196, 182, 0.1)');
  gradient.addColorStop(1, 'rgba(46, 196, 182, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(
    exit.x - glowRadius / 2,
    exit.y - glowRadius / 2,
    exit.width + glowRadius,
    exit.height + glowRadius
  );
}

/**
 * 출구 본체를 그립니다
 */
function drawExitBody(
  ctx: CanvasRenderingContext2D,
  exit: Exit,
  time: number
): void {
  const { x, y, width, height } = exit;

  // 문틀 (프레임)
  ctx.fillStyle = EXIT_COLORS.dark;
  ctx.fillRect(x - 4, y - 4, width + 8, height + 8);

  // 문 (그라데이션)
  const gradient = ctx.createLinearGradient(x, y, x + width, y + height);
  gradient.addColorStop(0, EXIT_COLORS.light);
  gradient.addColorStop(0.5, EXIT_COLORS.main);
  gradient.addColorStop(1, EXIT_COLORS.dark);

  ctx.fillStyle = gradient;
  ctx.fillRect(x, y, width, height);

  // 내부 빛 효과 (펄스)
  const innerPulse = 0.3 + Math.sin(time * 0.005) * 0.2;
  ctx.fillStyle = `rgba(255, 255, 255, ${innerPulse})`;
  ctx.fillRect(x + 4, y + 4, width - 8, height - 8);

  // 테두리
  ctx.strokeStyle = EXIT_COLORS.light;
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, width, height);
}

/**
 * 출구 화살표를 그립니다 (오른쪽 출구 표시)
 */
function drawExitArrow(
  ctx: CanvasRenderingContext2D,
  exit: Exit,
  time: number
): void {
  const centerX = exit.x + exit.width / 2;
  const centerY = exit.y + exit.height / 2;

  // 깜빡이는 화살표
  const blink = Math.sin(time * 0.008) > 0;
  if (!blink) return;

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();

  // 오른쪽 화살표
  const arrowSize = Math.min(exit.width, exit.height) * 0.3;
  ctx.moveTo(centerX + arrowSize, centerY);
  ctx.lineTo(centerX - arrowSize * 0.3, centerY - arrowSize * 0.6);
  ctx.lineTo(centerX - arrowSize * 0.3, centerY + arrowSize * 0.6);
  ctx.closePath();
  ctx.fill();
}

/**
 * 출구 렌더링 메인 함수
 */
export function renderExit(
  ctx: CanvasRenderingContext2D,
  exit: Exit,
  time: number
): void {
  // 1. 글로우 효과
  drawExitGlow(ctx, exit, time);

  // 2. 출구 본체
  drawExitBody(ctx, exit, time);

  // 3. 화살표
  drawExitArrow(ctx, exit, time);
}

/**
 * 클리어 시 출구 확대 효과
 */
export function renderClearExit(
  ctx: CanvasRenderingContext2D,
  exit: Exit,
  progress: number // 0 ~ 1
): void {
  const scale = 1 + progress * 0.5;
  const centerX = exit.x + exit.width / 2;
  const centerY = exit.y + exit.height / 2;

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.scale(scale, scale);
  ctx.translate(-centerX, -centerY);

  // 밝아지는 효과
  ctx.globalAlpha = 1 - progress * 0.5;
  drawExitBody(ctx, exit, 0);

  // 폭발 글로우
  const gradient = ctx.createRadialGradient(
    centerX, centerY, 0,
    centerX, centerY, exit.width * (1 + progress * 2)
  );
  gradient.addColorStop(0, `rgba(255, 255, 255, ${progress})`);
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(
    exit.x - exit.width,
    exit.y - exit.height,
    exit.width * 3,
    exit.height * 3
  );

  ctx.restore();
}
