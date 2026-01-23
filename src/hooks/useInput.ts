import { useState, useEffect, useCallback } from 'react';
import { InputState } from '../game/types';

interface UseInputReturn {
  input: InputState;
  setLeft: (pressed: boolean) => void;
  setRight: (pressed: boolean) => void;
}

/**
 * 입력 처리 훅
 * - 키보드 (화살표 키)
 * - 터치 컨트롤 (외부에서 setLeft/setRight 호출)
 */
export function useInput(): UseInputReturn {
  const [input, setInput] = useState<InputState>({
    left: false,
    right: false,
  });

  // 키보드 입력 처리
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
      setInput((prev) => ({ ...prev, left: true }));
    }
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
      setInput((prev) => ({ ...prev, right: true }));
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
      setInput((prev) => ({ ...prev, left: false }));
    }
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
      setInput((prev) => ({ ...prev, right: false }));
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  // 터치 컨트롤용 세터
  const setLeft = useCallback((pressed: boolean) => {
    setInput((prev) => ({ ...prev, left: pressed }));
  }, []);

  const setRight = useCallback((pressed: boolean) => {
    setInput((prev) => ({ ...prev, right: pressed }));
  }, []);

  return { input, setLeft, setRight };
}

export default useInput;
