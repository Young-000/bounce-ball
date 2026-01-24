// 게임 상수 - BOUND 스타일
export const GAME_CONFIG = {
  // 물리 설정
  GRAVITY: 0.3,           // 중력 (약하게)
  BOUNCE_VELOCITY: -8,    // 바운스 시 고정 속도 (항상 일정 높이로 튀기)
  MOVE_SPEED: 4,          // 좌우 이동 속도
  MAX_VELOCITY_Y: 12,     // 최대 낙하 속도
  FRICTION: 0.85,         // 공중 마찰 (좌우 감속)

  // 공 설정
  BALL_RADIUS: 4,

  // 블록 설정
  BLOCK_HEIGHT: 16,

  // 점프 블록 배수
  JUMP_BOOST: 1.8,

  // 화살표 블록 발사 속도
  ARROW_SPEED: 10,
} as const;

// 블록 타입
export type BlockType = 'normal' | 'jump' | 'breakable' | 'arrow' | 'bomb';

// 화살표 방향
export type ArrowDirection = 'up' | 'down' | 'left' | 'right';

// 위치 인터페이스
export interface Position {
  x: number;
  y: number;
}

// 속도 인터페이스
export interface Velocity {
  vx: number;
  vy: number;
}

// 공 상태
export interface BallState extends Position, Velocity {
  radius: number;
  isAlive: boolean;
}

// 블록 인터페이스
export interface Block {
  id: string;
  type: BlockType;
  x: number;
  y: number;
  width: number;
  height: number;
  direction?: ArrowDirection; // 화살표 블록용
  isActive: boolean; // 부서지는 블록용
}

// 출구 인터페이스
export interface Exit {
  x: number;
  y: number;
  width: number;
  height: number;
}

// 스테이지 데이터
export interface StageData {
  id: number;
  name: string;
  width: number;
  height: number;
  startPosition: Position;
  exit: Exit;
  blocks: Omit<Block, 'id' | 'isActive'>[];
}

// 게임 상태
export type GameStatus = 'ready' | 'playing' | 'cleared' | 'dead';

// 전체 게임 상태
export interface GameState {
  status: GameStatus;
  currentStage: number;
  ball: BallState;
  blocks: Block[];
  exit: Exit;
  stageSize: { width: number; height: number };
  elapsedTime: number;
  deathCount: number;
}

// 입력 상태
export interface InputState {
  left: boolean;
  right: boolean;
}

// 블록 색상 맵
export const BLOCK_COLORS: Record<BlockType, string> = {
  normal: '#6b7280',   // 회색
  jump: '#fbbf24',     // 노랑
  breakable: '#92400e', // 갈색
  arrow: '#3b82f6',    // 파랑
  bomb: '#ef4444',     // 빨강
};
