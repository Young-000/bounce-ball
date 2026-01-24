import { useState, useCallback } from 'react';
import { GameState, InputState } from '../game/types';
import { getStage, getTotalStages } from '../game/stages/stageData';
import { initializeStage, updateGameState, restartStage } from '../game/engine/GameLoop';
import {
  saveStageRecord,
  getStageRecord,
} from '../game/storage/saveService';

type Screen = 'start' | 'stageSelect' | 'playing' | 'clear' | 'dead';

interface UseGameStateReturn {
  // 현재 화면
  screen: Screen;

  // 게임 상태
  gameState: GameState | null;

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

  // 클리어 화면용 정보
  isNewRecord: boolean;
}

/**
 * 게임 상태 관리 훅
 */
export function useGameState(): UseGameStateReturn {
  const [screen, setScreen] = useState<Screen>('start');
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [currentStageNumber, setCurrentStageNumber] = useState(1);
  const [isNewRecord, setIsNewRecord] = useState(false);

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
      // 클리어! - 기록 저장
      const clearTime = newState.elapsedTime;
      const deathCount = newState.deathCount;

      // 기존 기록 확인
      const existingRecord = getStageRecord(currentStageNumber);
      const newRecord = !existingRecord?.bestTime || clearTime < existingRecord.bestTime;

      // 저장 서비스로 기록 저장
      saveStageRecord(currentStageNumber, clearTime, deathCount);

      setIsNewRecord(newRecord);
      setScreen('clear');
    } else if (newState.status === 'dead' && gameState.status !== 'dead') {
      // 사망!
      setScreen('dead');
    }
  }, [gameState, screen, currentStageNumber]);

  const isRunning = screen === 'playing' && gameState?.status === 'playing';

  return {
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
  };
}

export default useGameState;
