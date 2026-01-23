import React from 'react';
import { Button, Panel, PixelText } from '../ui';

interface StartScreenProps {
  onStart: () => void;
  onStageSelect: () => void;
}

/**
 * 시작 화면
 * - 게임 타이틀
 * - 시작 버튼
 * - 스테이지 선택 버튼
 */
export function StartScreen({
  onStart,
  onStageSelect,
}: StartScreenProps): React.ReactElement {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--bg-main)] p-6">
      {/* 타이틀 */}
      <div className="mb-12 text-center animate-pulse">
        <PixelText size="2xl" shadow className="text-[var(--ball-main)]">
          공튀기기
        </PixelText>
        <div className="mt-2">
          <PixelText size="sm" color="var(--text-secondary)">
            BOUNCE BALL
          </PixelText>
        </div>
      </div>

      {/* 공 아이콘 (장식) */}
      <div className="mb-12 animate-bounce">
        <div
          className="w-16 h-16 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #ffed4e, #ffe66d, #ffd43b)',
            boxShadow: '0 4px 0 #ffc107, 0 8px 20px rgba(255, 230, 109, 0.4)',
          }}
        />
      </div>

      {/* 버튼들 */}
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Button variant="primary" size="lg" fullWidth onClick={onStart}>
          START
        </Button>
        <Button variant="secondary" size="md" fullWidth onClick={onStageSelect}>
          STAGE SELECT
        </Button>
      </div>

      {/* 조작 안내 */}
      <Panel variant="transparent" padding="sm" className="mt-12 text-center">
        <PixelText size="xs" color="var(--text-muted)">
          ◀ ▶ : 좌우 이동
        </PixelText>
        <div className="mt-1">
          <PixelText size="xs" color="var(--text-muted)">
            출구로 도착하면 클리어!
          </PixelText>
        </div>
      </Panel>
    </div>
  );
}

export default StartScreen;
