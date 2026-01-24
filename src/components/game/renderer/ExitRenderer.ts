import { Exit } from '../../../game/types';

/**
 * 출구 색상 정의 (네온 퍼플)
 */
const EXIT_COLORS = {
  main: '#aa44ff',
  light: '#cc66ff',
  dark: '#8822cc',
  glow: '#aa44ff66',
};

/**
 * 출구 글로우 효과 (네온)
 */
function drawExitGlow(
  ctx: CanvasRenderingContext2D,
  exit: Exit,
  time: number
): void {
  // 펄스 효과
  const pulse = 1 + Math.sin(time * 0.004) * 0.3;

  // 네온 글로우
  ctx.shadowColor = EXIT_COLORS.glow;
  ctx.shadowBlur = 20 * pulse;

  ctx.fillStyle = EXIT_COLORS.glow;
  ctx.fillRect(exit.x - 5, exit.y - 5, exit.width + 10, exit.height + 10);

  ctx.shadowBlur = 0;
}

/**
 * 픽셀 스타일 출구 본체
 */
function drawExitBody(
  ctx: CanvasRenderingContext2D,
  exit: Exit,
  time: number
): void {
  const { x, y, width, height } = exit;
  const px = 2; // 픽셀 크기

  // 네온 글로우
  ctx.shadowColor = '#aa44ff';
  ctx.shadowBlur = 15;

  // 1. 문틀 (프레임) - 어두운 색
  ctx.fillStyle = EXIT_COLORS.dark;
  ctx.fillRect(x - px * 2, y - px * 2, width + px * 4, height + px * 4);

  // 2. 문 본체 - 메인 색
  ctx.fillStyle = EXIT_COLORS.main;
  ctx.fillRect(x, y, width, height);

  // 3. 하이라이트 (상단/좌측)
  ctx.fillStyle = EXIT_COLORS.light;
  ctx.fillRect(x, y, width, px * 2);
  ctx.fillRect(x, y, px * 2, height);

  // 4. 그림자 (하단/우측)
  ctx.fillStyle = EXIT_COLORS.dark;
  ctx.fillRect(x, y + height - px * 2, width, px * 2);
  ctx.fillRect(x + width - px * 2, y, px * 2, height);

  ctx.shadowBlur = 0;

  // 5. 내부 빛 효과 (펄스)
  const innerPulse = 0.4 + Math.sin(time * 0.006) * 0.3;
  ctx.fillStyle = `rgba(255, 255, 255, ${innerPulse})`;
  ctx.fillRect(x + px * 3, y + px * 3, width - px * 6, height - px * 6);

  // 6. 테두리
  ctx.strokeStyle = EXIT_COLORS.light;
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 0.5, y + 0.5, width - 1, height - 1);
}

/**
 * 픽셀 화살표
 */
function drawExitArrow(
  ctx: CanvasRenderingContext2D,
  exit: Exit,
  time: number
): void {
  const centerX = exit.x + exit.width / 2;
  const centerY = exit.y + exit.height / 2;
  const px = 2;

  // 깜빡이는 화살표
  const blink = Math.sin(time * 0.01) > 0;
  if (!blink) return;

  ctx.fillStyle = '#ffffff';

  // 픽셀 화살표 (오른쪽 방향)
  // ▶ 모양
  ctx.fillRect(centerX - px * 2, centerY - px * 2, px, px * 4);
  ctx.fillRect(centerX - px, centerY - px, px, px * 2);
  ctx.fillRect(centerX, centerY - px * 0.5, px, px);
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

  // 네온 폭발 글로우
  ctx.shadowColor = '#aa44ff';
  ctx.shadowBlur = 30 * progress;

  const gradient = ctx.createRadialGradient(
    centerX, centerY, 0,
    centerX, centerY, exit.width * (1 + progress * 2)
  );
  gradient.addColorStop(0, `rgba(170, 68, 255, ${progress})`);
  gradient.addColorStop(0.5, `rgba(170, 68, 255, ${progress * 0.5})`);
  gradient.addColorStop(1, 'rgba(170, 68, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(
    exit.x - exit.width,
    exit.y - exit.height,
    exit.width * 3,
    exit.height * 3
  );

  ctx.shadowBlur = 0;
  ctx.restore();
}
