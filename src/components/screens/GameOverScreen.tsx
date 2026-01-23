import React from 'react';
import { Button, PixelText } from '../ui';

interface GameOverScreenProps {
  stageNumber: number;
  deathCount: number;
  onRetry: () => void;
  onStageSelect: () => void;
}

/**
 * 게임오버 화면 (사망 시)
 * - 간단한 메시지
 * - 재시작 버튼
 */
export function GameOverScreen({
  stageNumber,
  deathCount,
  onRetry,
  onStageSelect,
}: GameOverScreenProps): React.ReactElement {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-50 animate-fadeIn">
      {/* 사망 아이콘 */}
      <div className="text-5xl mb-4 animate-shake">
        💀
      </div>

      {/* 메시지 */}
      <div className="text-center mb-6">
        <PixelText size="lg" shadow color="var(--ui-danger)">
          GAME OVER
        </PixelText>
        <div className="mt-2">
          <PixelText size="xs" color="var(--text-secondary)">
            Stage {stageNumber}
          </PixelText>
        </div>
        <div className="mt-1">
          <PixelText size="xs" color="var(--text-muted)">
            Deaths: {deathCount}
          </PixelText>
        </div>
      </div>

      {/* 버튼들 */}
      <div className="flex flex-col gap-3 w-64">
        <Button variant="primary" size="lg" fullWidth onClick={onRetry}>
          RETRY
        </Button>
        <Button variant="ghost" size="sm" fullWidth onClick={onStageSelect}>
          STAGE SELECT
        </Button>
      </div>
    </div>
  );
}

export default GameOverScreen;
