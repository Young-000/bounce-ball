import React from 'react';
import { Button, Panel, PixelText } from '../ui';

interface ClearScreenProps {
  stageNumber: number;
  stageName: string;
  clearTime: number; // 밀리초
  deathCount: number;
  isNewRecord: boolean;
  hasNextStage: boolean;
  onNextStage: () => void;
  onRetry: () => void;
  onStageSelect: () => void;
}

/**
 * 시간을 MM:SS.mmm 형식으로 포맷
 */
function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}

/**
 * 별 개수 계산 (시간 + 사망 횟수 기준)
 */
function calculateStars(clearTime: number, deathCount: number): number {
  // 30초 이내, 사망 0회 = 3별
  // 60초 이내, 사망 3회 이내 = 2별
  // 그 외 = 1별
  if (clearTime < 30000 && deathCount === 0) return 3;
  if (clearTime < 60000 && deathCount <= 3) return 2;
  return 1;
}

/**
 * 클리어 화면
 * - 클리어 메시지
 * - 통계 (시간, 사망 횟수)
 * - 별 표시
 * - 버튼들
 */
export function ClearScreen({
  stageNumber,
  stageName,
  clearTime,
  deathCount,
  isNewRecord,
  hasNextStage,
  onNextStage,
  onRetry,
  onStageSelect,
}: ClearScreenProps): React.ReactElement {
  const stars = calculateStars(clearTime, deathCount);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--bg-main)] p-6">
      {/* 클리어 메시지 */}
      <div className="text-center mb-6 animate-fadeInDown">
        <PixelText size="xl" shadow color="var(--exit-main)">
          STAGE CLEAR!
        </PixelText>
        <div className="mt-2">
          <PixelText size="sm" color="var(--text-secondary)">
            Stage {stageNumber}: {stageName}
          </PixelText>
        </div>
      </div>

      {/* 별 표시 */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={`text-3xl ${i <= stars ? 'animate-star' : 'opacity-30'}`}
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            ⭐
          </span>
        ))}
      </div>

      {/* 통계 */}
      <Panel padding="md" className="w-full max-w-xs mb-8 animate-fadeInUp">
        <div className="flex justify-between items-center mb-3">
          <PixelText size="xs" color="var(--text-secondary)">
            TIME
          </PixelText>
          <PixelText size="sm" shadow>
            {formatTime(clearTime)}
          </PixelText>
        </div>
        <div className="flex justify-between items-center mb-3">
          <PixelText size="xs" color="var(--text-secondary)">
            DEATHS
          </PixelText>
          <PixelText size="sm" shadow color={deathCount > 0 ? 'var(--ui-danger)' : 'var(--ui-success)'}>
            {deathCount}
          </PixelText>
        </div>
        {isNewRecord && (
          <div className="text-center mt-4 animate-pulse">
            <PixelText size="xs" color="var(--ui-primary)">
              🏆 NEW RECORD! 🏆
            </PixelText>
          </div>
        )}
      </Panel>

      {/* 버튼들 */}
      <div className="flex flex-col gap-3 w-full max-w-xs">
        {hasNextStage && (
          <Button variant="primary" size="lg" fullWidth onClick={onNextStage}>
            NEXT STAGE →
          </Button>
        )}
        <Button variant="secondary" size="md" fullWidth onClick={onRetry}>
          RETRY
        </Button>
        <Button variant="ghost" size="sm" fullWidth onClick={onStageSelect}>
          STAGE SELECT
        </Button>
      </div>
    </div>
  );
}

export default ClearScreen;
