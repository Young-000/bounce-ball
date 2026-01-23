import React, { useRef, useEffect, useCallback } from 'react';
import { GameState } from '../../game/types';
import { renderBlocks, renderBall, renderExit } from './renderer';
import { renderBackground } from './renderer/BackgroundRenderer';

interface GameCanvasProps {
  gameState: GameState;
  time: number;
}

/**
 * 게임 캔버스 컴포넌트
 * - 모든 게임 요소 렌더링
 * - 반응형 크기 조절
 */
export function GameCanvas({ gameState, time }: GameCanvasProps): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 캔버스 크기 조절
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const { width, height } = gameState.stageSize;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // 비율 유지하면서 컨테이너에 맞추기
    const scaleX = containerWidth / width;
    const scaleY = containerHeight / height;
    const scale = Math.min(scaleX, scaleY);

    const scaledWidth = width * scale;
    const scaledHeight = height * scale;

    canvas.style.width = `${scaledWidth}px`;
    canvas.style.height = `${scaledHeight}px`;

    // 고해상도 디스플레이 지원
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }, [gameState.stageSize]);

  // 초기 크기 설정 및 리사이즈 핸들러
  useEffect(() => {
    updateCanvasSize();

    const handleResize = () => updateCanvasSize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [updateCanvasSize]);

  // 렌더링
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = gameState.stageSize;

    // 배경 (그라데이션 + 별 + 위험구역)
    renderBackground(ctx, width, height, time);

    // 출구 (블록 뒤에)
    renderExit(ctx, gameState.exit, time);

    // 블록들
    renderBlocks(ctx, gameState.blocks, time);

    // 공
    renderBall(ctx, gameState.ball, height);

  }, [gameState, time]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center bg-[var(--bg-main)]"
    >
      <canvas
        ref={canvasRef}
        className="border-2 border-white/20 rounded-sm"
        style={{
          boxShadow: '0 0 20px rgba(46, 196, 182, 0.2)',
        }}
      />
    </div>
  );
}

export default GameCanvas;
