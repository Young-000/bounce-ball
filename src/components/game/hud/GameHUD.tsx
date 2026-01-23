import React from 'react';
import { PixelText } from '../../ui';

interface GameHUDProps {
  stageNumber: number;
  stageName?: string;
  elapsedTime: number; // 밀리초
  deathCount: number;
}

/**
 * 시간을 MM:SS 형식으로 포맷
 */
function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * 게임 HUD
 * - 스테이지 번호
 * - 경과 시간
 * - 사망 횟수
 */
export function GameHUD({
  stageNumber,
  stageName,
  elapsedTime,
  deathCount,
}: GameHUDProps): React.ReactElement {
  return (
    <div
      className="
        w-full px-3 py-2
        flex items-center justify-between
        bg-[var(--bg-panel)]/80
        border-b-2 border-white/20
        backdrop-blur-sm
      "
    >
      {/* 스테이지 정보 */}
      <div className="flex items-center gap-2">
        <PixelText size="xs" color="var(--text-accent)">
          STAGE
        </PixelText>
        <PixelText size="sm" shadow>
          {stageNumber}
        </PixelText>
        {stageName && (
          <PixelText size="xs" color="var(--text-secondary)" className="hidden sm:inline">
            {stageName}
          </PixelText>
        )}
      </div>

      {/* 타이머 */}
      <div className="flex items-center gap-2">
        <span className="text-sm">⏱</span>
        <PixelText size="sm" shadow>
          {formatTime(elapsedTime)}
        </PixelText>
      </div>

      {/* 사망 횟수 */}
      <div className="flex items-center gap-2">
        <span className="text-sm">💀</span>
        <PixelText size="sm" shadow color={deathCount > 0 ? 'var(--ui-danger)' : 'var(--text-primary)'}>
          {deathCount}
        </PixelText>
      </div>
    </div>
  );
}

export default GameHUD;
