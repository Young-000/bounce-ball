import React from 'react';
import { Button, PixelText } from '../ui';
import { stages } from '../../game/stages/stageData';
import {
  isStageUnlocked,
  getStageRecord,
  getProgress,
  getTotalStars,
} from '../../game/storage/saveService';

interface StageSelectScreenProps {
  onSelectStage: (stageNumber: number) => void;
  onBack: () => void;
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
 * - LocalStorage 기반 저장
 */
export function StageSelectScreen({
  onSelectStage,
  onBack,
}: StageSelectScreenProps): React.ReactElement {
  const progress = getProgress(stages.length);
  const totalStars = getTotalStars();
  const maxStars = stages.length * 3;

  return (
    <div className="w-full h-full flex flex-col bg-[var(--bg-main)] p-4">
      {/* 헤더 */}
      <div className="text-center mb-4">
        <PixelText size="lg" shadow>
          STAGE SELECT
        </PixelText>
        {/* 진행 상황 */}
        <div className="mt-2 flex justify-center gap-4">
          <PixelText size="xs" color="var(--text-secondary)">
            진행률: {progress}%
          </PixelText>
          <PixelText size="xs" color="var(--text-accent)">
            ⭐ {totalStars}/{maxStars}
          </PixelText>
        </div>
      </div>

      {/* 스테이지 그리드 */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto">
          {stages.map((stage) => {
            const record = getStageRecord(stage.id);
            const isCleared = record?.cleared ?? false;
            const isLocked = !isStageUnlocked(stage.id);
            const stars = record?.stars ?? 0;
            const bestTime = record?.bestTime;

            return (
              <button
                key={stage.id}
                onClick={() => !isLocked && onSelectStage(stage.id)}
                disabled={isLocked}
                className={`
                  relative p-2 rounded-sm
                  border-2 transition-all
                  ${isLocked
                    ? 'bg-[var(--bg-panel)]/50 border-white/10 opacity-50 cursor-not-allowed'
                    : isCleared
                      ? 'bg-[var(--exit-dark)]/30 border-[var(--exit-main)] hover:bg-[var(--exit-dark)]/50'
                      : 'bg-[var(--bg-panel)] border-white/20 hover:border-[var(--ui-primary)]'
                  }
                `}
                style={{
                  boxShadow: isLocked ? 'none' : '2px 2px 0 rgba(0, 0, 0, 0.3)',
                }}
              >
                {/* 스테이지 번호 */}
                <PixelText size="sm" shadow>
                  {isLocked ? '🔒' : stage.id}
                </PixelText>

                {/* 클리어 표시 - 별 */}
                {isCleared && (
                  <div className="mt-1">
                    <span className="text-[10px]">
                      {'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)}
                    </span>
                    {bestTime && (
                      <div className="mt-0.5">
                        <PixelText size="xs" color="var(--text-accent)">
                          {formatTime(bestTime)}
                        </PixelText>
                      </div>
                    )}
                  </div>
                )}

                {/* 미클리어 - 스테이지 이름 */}
                {!isCleared && !isLocked && (
                  <div className="mt-1">
                    <PixelText size="xs" color="var(--text-muted)">
                      {stage.name.slice(0, 4)}
                    </PixelText>
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
