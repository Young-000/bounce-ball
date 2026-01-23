import { useEffect, useRef, useCallback } from 'react';

interface UseGameLoopOptions {
  onUpdate: (deltaTime: number, time: number) => void;
  onRender: (time: number) => void;
  isRunning: boolean;
  targetFPS?: number;
}

/**
 * 게임 루프 훅
 * - requestAnimationFrame 기반
 * - deltaTime으로 프레임 독립적 업데이트
 * - 60fps 타겟
 */
export function useGameLoop({
  onUpdate,
  onRender,
  isRunning,
  targetFPS = 60,
}: UseGameLoopOptions): void {
  const frameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const accumulatorRef = useRef<number>(0);

  const fixedDeltaTime = 1000 / targetFPS;

  const gameLoop = useCallback(
    (currentTime: number) => {
      if (!isRunning) {
        lastTimeRef.current = 0;
        return;
      }

      // 첫 프레임 초기화
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = currentTime;
      }

      // deltaTime 계산
      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      // 너무 큰 deltaTime 방지 (탭 전환 등)
      const clampedDelta = Math.min(deltaTime, 100);

      // 고정 시간 업데이트 (물리 안정성)
      accumulatorRef.current += clampedDelta;

      while (accumulatorRef.current >= fixedDeltaTime) {
        onUpdate(fixedDeltaTime, currentTime);
        accumulatorRef.current -= fixedDeltaTime;
      }

      // 렌더링
      onRender(currentTime);

      // 다음 프레임 예약
      frameRef.current = requestAnimationFrame(gameLoop);
    },
    [isRunning, onUpdate, onRender, fixedDeltaTime]
  );

  useEffect(() => {
    if (isRunning) {
      frameRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isRunning, gameLoop]);
}

export default useGameLoop;
