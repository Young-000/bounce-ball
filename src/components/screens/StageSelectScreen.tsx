import React from 'react';
import { Button, PixelText } from '../ui';
import { stages } from '../../game/stages/stageData';

interface StageSelectScreenProps {
  onSelectStage: (stageNumber: number) => void;
  onBack: () => void;
  clearedStages: Set<number>;
  bestTimes: Record<number, number>; // stageNumber -> bestTime (ms)
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
 * 스테이지 선택 화면
 * - 스테이지 그리드
 * - 클리어 상태 표시
 * - 베스트 타임 표시
 */
export function StageSelectScreen({
  onSelectStage,
  onBack,
  clearedStages,
  bestTimes,
}: StageSelectScreenProps): React.ReactElement {
  return (
    <div className="w-full h-full flex flex-col bg-[var(--bg-main)] p-4">
      {/* 헤더 */}
      <div className="text-center mb-6">
        <PixelText size="lg" shadow>
          STAGE SELECT
        </PixelText>
      </div>

      {/* 스테이지 그리드 */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
          {stages.map((stage, index) => {
            const isCleared = clearedStages.has(stage.id);
            const isLocked = index > 0 && !clearedStages.has(stages[index - 1].id);
            const bestTime = bestTimes[stage.id];

            return (
              <button
                key={stage.id}
                onClick={() => !isLocked && onSelectStage(stage.id)}
                disabled={isLocked}
                className={`
                  relative p-3 rounded-sm
                  border-2 transition-all
                  ${isLocked
                    ? 'bg-[var(--bg-panel)]/50 border-white/10 opacity-50 cursor-not-allowed'
                    : isCleared
                      ? 'bg-[var(--exit-dark)]/30 border-[var(--exit-main)] hover:bg-[var(--exit-dark)]/50'
                      : 'bg-[var(--bg-panel)] border-white/20 hover:border-[var(--ui-primary)]'
                  }
                `}
                style={{
                  boxShadow: isLocked ? 'none' : '3px 3px 0 rgba(0, 0, 0, 0.3)',
                }}
              >
                {/* 스테이지 번호 */}
                <PixelText size="lg" shadow>
                  {isLocked ? '🔒' : stage.id}
                </PixelText>

                {/* 스테이지 이름 */}
                <div className="mt-1">
                  <PixelText size="xs" color="var(--text-secondary)">
                    {isLocked ? '???' : stage.name}
                  </PixelText>
                </div>

                {/* 클리어 표시 */}
                {isCleared && (
                  <div className="mt-2">
                    <span className="text-sm">⭐</span>
                    {bestTime && (
                      <div className="mt-1">
                        <PixelText size="xs" color="var(--text-accent)">
                          {formatTime(bestTime)}
                        </PixelText>
                      </div>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 뒤로 가기 버튼 */}
      <div className="mt-4">
        <Button variant="ghost" size="md" fullWidth onClick={onBack}>
          ← BACK
        </Button>
      </div>
    </div>
  );
}

export default StageSelectScreen;
