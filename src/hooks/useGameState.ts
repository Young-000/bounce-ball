import { useState, useCallback, useEffect } from 'react';
import { GameState, InputState } from '../game/types';
import { getStage, getTotalStages } from '../game/stages/stageData';
import { initializeStage, updateGameState, restartStage } from '../game/engine/GameLoop';

type Screen = 'start' | 'stageSelect' | 'playing' | 'clear' | 'dead';

interface GameProgress {
  clearedStages: Set<number>;
  bestTimes: Record<number, number>;
}

const STORAGE_KEY = 'bounce-ball-progress';

/**
 * 로컬 스토리지에서 진행 상황 로드
 */
function loadProgress(): GameProgress {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        clearedStages: new Set(parsed.clearedStages || []),
        bestTimes: parsed.bestTimes || {},
      };
    }
  } catch (e) {
    console.error('Failed to load progress:', e);
  }
  return { clearedStages: new Set(), bestTimes: {} };
}

/**
 * 로컬 스토리지에 진행 상황 저장
 */
function saveProgress(progress: GameProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      clearedStages: Array.from(progress.clearedStages),
      bestTimes: progress.bestTimes,
    }));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
}

interface UseGameStateReturn {
  // 현재 화면
  screen: Screen;

  // 게임 상태
  gameState: GameState | null;

  // 진행 상황
  progress: GameProgress;

  // 액션들
  startGame: (stageNumber?: number) => void;
  goToStageSelect: () => void;
  goToStart: () => void;
  retryStage: () => void;
  nextStage: () => void;

  // 게임 업데이트
  updateGame: (input: InputState, deltaTime: number) => void;

  // 게임 루프 실행 여부
  isRunning: boolean;
}

/**
 * 게임 상태 관리 훅
 */
export function useGameState(): UseGameStateReturn {
  const [screen, setScreen] = useState<Screen>('start');
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [progress, setProgress] = useState<GameProgress>(loadProgress);
  const [currentStageNumber, setCurrentStageNumber] = useState(1);

  // 진행 상황 변경 시 저장
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // 게임 시작
  const startGame = useCallback((stageNumber: number = 1) => {
    const stage = getStage(stageNumber);
    if (!stage) return;

    const initialState = initializeStage(stage, stageNumber);
    initialState.status = 'playing';

    setGameState(initialState);
    setCurrentStageNumber(stageNumber);
    setScreen('playing');
  }, []);

  // 스테이지 선택 화면으로
  const goToStageSelect = useCallback(() => {
    setScreen('stageSelect');
  }, []);

  // 시작 화면으로
  const goToStart = useCallback(() => {
    setScreen('start');
    setGameState(null);
  }, []);

  // 재시작
  const retryStage = useCallback(() => {
    const stage = getStage(currentStageNumber);
    if (!stage || !gameState) return;

    const newState = restartStage(gameState, stage.startPosition);
    setGameState(newState);
    setScreen('playing');
  }, [currentStageNumber, gameState]);

  // 다음 스테이지
  const nextStage = useCallback(() => {
    const nextStageNumber = currentStageNumber + 1;
    if (nextStageNumber <= getTotalStages()) {
      startGame(nextStageNumber);
    } else {
      goToStart();
    }
  }, [currentStageNumber, startGame, goToStart]);

  // 게임 업데이트
  const updateGame = useCallback((input: InputState, deltaTime: number) => {
    if (!gameState || screen !== 'playing') return;

    const newState = updateGameState(gameState, input, deltaTime);
    setGameState(newState);

    // 상태 변화 감지
    if (newState.status === 'cleared' && gameState.status !== 'cleared') {
      // 클리어!
      const clearTime = newState.elapsedTime;
      const isNewRecord = !progress.bestTimes[currentStageNumber] ||
                         clearTime < progress.bestTimes[currentStageNumber];

      setProgress(prev => ({
        clearedStages: new Set([...prev.clearedStages, currentStageNumber]),
        bestTimes: {
          ...prev.bestTimes,
          [currentStageNumber]: isNewRecord ? clearTime : prev.bestTimes[currentStageNumber],
        },
      }));

      setScreen('clear');
    } else if (newState.status === 'dead' && gameState.status !== 'dead') {
      // 사망!
      setScreen('dead');
    }
  }, [gameState, screen, currentStageNumber, progress]);

  const isRunning = screen === 'playing' && gameState?.status === 'playing';

  return {
    screen,
    gameState,
    progress,
    startGame,
    goToStageSelect,
    goToStart,
    retryStage,
    nextStage,
    updateGame,
    isRunning,
  };
}

export default useGameState;
