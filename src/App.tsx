import React, { useRef, useCallback } from 'react';
import { useGameState } from './hooks/useGameState';
import { useGameLoop } from './hooks/useGameLoop';
import { useInput } from './hooks/useInput';
import { getStage, getTotalStages } from './game/stages/stageData';

// 컴포넌트들
import { GameCanvas } from './components/game/GameCanvas';
import { TouchControls } from './components/game/controls/TouchControls';
import { GameHUD } from './components/game/hud/GameHUD';
import {
  StartScreen,
  StageSelectScreen,
  ClearScreen,
  GameOverScreen,
} from './components/screens';

function App(): React.ReactElement {
  // 게임 상태 관리
  const {
    screen,
    gameState,
    startGame,
    goToStageSelect,
    goToStart,
    retryStage,
    nextStage,
    updateGame,
    isRunning,
    isNewRecord,
  } = useGameState();

  // 입력 처리
  const { input, setLeft, setRight } = useInput();

  // 시간 추적 (렌더링용)
  const timeRef = useRef(0);

  // 게임 업데이트
  const handleUpdate = useCallback(
    (deltaTime: number, _time: number) => {
      updateGame(input, deltaTime);
    },
    [updateGame, input]
  );

  // 렌더링 (시간 업데이트)
  const handleRender = useCallback((time: number) => {
    timeRef.current = time;
  }, []);

  // 게임 루프
  useGameLoop({
    onUpdate: handleUpdate,
    onRender: handleRender,
    isRunning,
  });

  // 현재 스테이지 정보
  const currentStage = gameState ? getStage(gameState.currentStage) : null;

  return (
    <div className="w-full h-full flex flex-col bg-[var(--bg-main)]">
      {/* 시작 화면 */}
      {screen === 'start' && (
        <StartScreen
          onStart={() => startGame(1)}
          onStageSelect={goToStageSelect}
        />
      )}

      {/* 스테이지 선택 화면 */}
      {screen === 'stageSelect' && (
        <StageSelectScreen
          onSelectStage={startGame}
          onBack={goToStart}
        />
      )}

      {/* 게임 플레이 화면 (playing, dead만 - clear는 별도 화면으로 전환) */}
      {(screen === 'playing' || screen === 'dead') && gameState && (
        <div className="flex flex-col h-full">
          {/* HUD */}
          <GameHUD
            stageNumber={gameState.currentStage}
            stageName={currentStage?.name}
            elapsedTime={gameState.elapsedTime}
            deathCount={gameState.deathCount}
          />

          {/* 게임 캔버스 */}
          <div className="flex-1 relative">
            <GameCanvas gameState={gameState} time={timeRef.current} />

            {/* 게임오버 오버레이 */}
            {screen === 'dead' && (
              <GameOverScreen
                stageNumber={gameState.currentStage}
                deathCount={gameState.deathCount}
                onRetry={retryStage}
                onStageSelect={goToStageSelect}
              />
            )}
          </div>

          {/* 터치 컨트롤 */}
          <TouchControls
            onLeftStart={() => setLeft(true)}
            onLeftEnd={() => setLeft(false)}
            onRightStart={() => setRight(true)}
            onRightEnd={() => setRight(false)}
            disabled={screen !== 'playing'}
          />
        </div>
      )}

      {/* 클리어 화면 */}
      {screen === 'clear' && gameState && currentStage && (
        <ClearScreen
          stageNumber={gameState.currentStage}
          stageName={currentStage.name}
          clearTime={gameState.elapsedTime}
          deathCount={gameState.deathCount}
          isNewRecord={isNewRecord}
          hasNextStage={gameState.currentStage < getTotalStages()}
          onNextStage={nextStage}
          onRetry={retryStage}
          onStageSelect={goToStageSelect}
        />
      )}
    </div>
  );
}

export default App;
