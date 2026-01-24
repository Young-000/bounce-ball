import React, { useCallback } from 'react';

interface TouchControlsProps {
  onLeftStart: () => void;
  onLeftEnd: () => void;
  onRightStart: () => void;
  onRightEnd: () => void;
  disabled?: boolean;
}

/**
 * 모바일 터치 컨트롤
 * - 화면 하단 좌/우 버튼
 * - 터치 시작/종료 이벤트 처리
 * - 시각적 피드백
 */
export function TouchControls({
  onLeftStart,
  onLeftEnd,
  onRightStart,
  onRightEnd,
  disabled = false,
}: TouchControlsProps): React.ReactElement {
  // 터치 이벤트 핸들러 (마우스도 지원)
  const handleLeftTouchStart = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      e.preventDefault();
      if (!disabled) onLeftStart();
    },
    [onLeftStart, disabled]
  );

  const handleLeftTouchEnd = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      e.preventDefault();
      onLeftEnd();
    },
    [onLeftEnd]
  );

  const handleRightTouchStart = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      e.preventDefault();
      if (!disabled) onRightStart();
    },
    [onRightStart, disabled]
  );

  const handleRightTouchEnd = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      e.preventDefault();
      onRightEnd();
    },
    [onRightEnd]
  );

  const buttonBaseClass = `
    flex-1
    flex items-center justify-center
    text-white text-4xl
    select-none
    transition-all duration-100
    bg-[var(--control-bg)]
    border-t-2 border-[var(--control-border)]
    active:bg-[var(--control-active)]
    ${disabled ? 'opacity-30' : 'opacity-100'}
  `;

  return (
    <div className="flex h-24 w-full">
      {/* 왼쪽 버튼 */}
      <button
        className={buttonBaseClass}
        onTouchStart={handleLeftTouchStart}
        onTouchEnd={handleLeftTouchEnd}
        onTouchCancel={handleLeftTouchEnd}
        onMouseDown={handleLeftTouchStart}
        onMouseUp={handleLeftTouchEnd}
        onMouseLeave={handleLeftTouchEnd}
        disabled={disabled}
        aria-label="왼쪽으로 이동"
        style={{ fontFamily: 'Arial, sans-serif' }}
      >
        <span className="transform -translate-y-1">◀</span>
      </button>

      {/* 구분선 */}
      <div className="w-[2px] bg-[var(--control-border)]" />

      {/* 오른쪽 버튼 */}
      <button
        className={buttonBaseClass}
        onTouchStart={handleRightTouchStart}
        onTouchEnd={handleRightTouchEnd}
        onTouchCancel={handleRightTouchEnd}
        onMouseDown={handleRightTouchStart}
        onMouseUp={handleRightTouchEnd}
        onMouseLeave={handleRightTouchEnd}
        disabled={disabled}
        aria-label="오른쪽으로 이동"
        style={{ fontFamily: 'Arial, sans-serif' }}
      >
        <span className="transform -translate-y-1">▶</span>
      </button>
    </div>
  );
}

export default TouchControls;
