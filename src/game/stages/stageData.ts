import { StageData } from '../types';

/**
 * 스테이지 데이터
 * - 모바일 화면 기준 (360 x 640)
 * - 바운스 높이 약 100px 기준으로 설계
 * - 발판 간격: 70-90px (점프로 닿을 수 있는 거리)
 * - 발판 너비: 최소 80px, 권장 120px 이상
 */
export const stages: StageData[] = [
  // Stage 1: 튜토리얼 - 기본 바운스와 이동
  {
    id: 1,
    name: '첫 걸음',
    width: 360,
    height: 480,
    startPosition: { x: 60, y: 400 },
    exit: { x: 280, y: 360, width: 60, height: 50 },
    blocks: [
      // 시작 플랫폼 (넓고 안전하게)
      { type: 'normal', x: 20, y: 430, width: 150, height: 20 },
      // 목표 플랫폼
      { type: 'normal', x: 200, y: 430, width: 140, height: 20 },
    ],
  },

  // Stage 2: 계단 오르기
  {
    id: 2,
    name: '계단',
    width: 360,
    height: 500,
    startPosition: { x: 60, y: 420 },
    exit: { x: 280, y: 120, width: 60, height: 50 },
    blocks: [
      // 1층 (시작)
      { type: 'normal', x: 20, y: 450, width: 140, height: 20 },
      // 2층
      { type: 'normal', x: 180, y: 370, width: 160, height: 20 },
      // 3층
      { type: 'normal', x: 20, y: 290, width: 160, height: 20 },
      // 4층 (출구)
      { type: 'normal', x: 180, y: 210, width: 160, height: 20 },
    ],
  },

  // Stage 3: 점프 블록 소개
  {
    id: 3,
    name: '높이 뛰기',
    width: 360,
    height: 550,
    startPosition: { x: 60, y: 470 },
    exit: { x: 280, y: 80, width: 60, height: 50 },
    blocks: [
      // 1층 (시작)
      { type: 'normal', x: 20, y: 500, width: 140, height: 20 },
      // 점프 블록 (위에 올려놓기)
      { type: 'jump', x: 50, y: 480, width: 80, height: 20 },
      // 2층 - 점프 블록으로 높이 뛰어서 도달
      { type: 'normal', x: 180, y: 350, width: 160, height: 20 },
      // 3층
      { type: 'normal', x: 20, y: 230, width: 160, height: 20 },
      // 출구 층
      { type: 'normal', x: 180, y: 130, width: 160, height: 20 },
    ],
  },

  // Stage 4: 부서지는 블록
  {
    id: 4,
    name: '무너지는 길',
    width: 360,
    height: 500,
    startPosition: { x: 60, y: 70 },
    exit: { x: 280, y: 400, width: 60, height: 50 },
    blocks: [
      // 시작 플랫폼 (상단)
      { type: 'normal', x: 20, y: 100, width: 140, height: 20 },
      // 부서지는 다리
      { type: 'breakable', x: 170, y: 100, width: 80, height: 20 },
      { type: 'breakable', x: 260, y: 100, width: 80, height: 20 },
      // 2층
      { type: 'normal', x: 180, y: 200, width: 160, height: 20 },
      // 부서지는 다리 2
      { type: 'breakable', x: 80, y: 300, width: 100, height: 20 },
      // 바닥 (출구)
      { type: 'normal', x: 180, y: 450, width: 160, height: 20 },
    ],
  },

  // Stage 5: 폭탄 회피
  {
    id: 5,
    name: '위험한 길',
    width: 360,
    height: 550,
    startPosition: { x: 60, y: 470 },
    exit: { x: 280, y: 80, width: 60, height: 50 },
    blocks: [
      // 1층 (시작)
      { type: 'normal', x: 20, y: 500, width: 130, height: 20 },
      { type: 'bomb', x: 160, y: 500, width: 40, height: 20 },
      { type: 'normal', x: 210, y: 500, width: 130, height: 20 },
      // 2층
      { type: 'normal', x: 200, y: 400, width: 140, height: 20 },
      { type: 'bomb', x: 150, y: 400, width: 40, height: 20 },
      { type: 'normal', x: 20, y: 400, width: 120, height: 20 },
      // 3층
      { type: 'normal', x: 20, y: 300, width: 130, height: 20 },
      { type: 'bomb', x: 160, y: 300, width: 40, height: 20 },
      { type: 'normal', x: 210, y: 300, width: 130, height: 20 },
      // 4층
      { type: 'normal', x: 200, y: 200, width: 140, height: 20 },
      // 출구 층
      { type: 'normal', x: 180, y: 130, width: 160, height: 20 },
    ],
  },

  // Stage 6: 화살표 블록
  {
    id: 6,
    name: '발사!',
    width: 360,
    height: 600,
    startPosition: { x: 60, y: 520 },
    exit: { x: 280, y: 50, width: 60, height: 50 },
    blocks: [
      // 1층 (시작)
      { type: 'normal', x: 20, y: 550, width: 150, height: 20 },
      // 위로 발사
      { type: 'arrow', x: 60, y: 530, width: 70, height: 20, direction: 'up' },
      // 2층
      { type: 'normal', x: 180, y: 380, width: 160, height: 20 },
      // 왼쪽으로 발사
      { type: 'arrow', x: 230, y: 360, width: 70, height: 20, direction: 'left' },
      // 3층
      { type: 'normal', x: 20, y: 230, width: 150, height: 20 },
      // 위로 발사
      { type: 'arrow', x: 60, y: 210, width: 70, height: 20, direction: 'up' },
      // 출구 층
      { type: 'normal', x: 180, y: 100, width: 160, height: 20 },
    ],
  },

  // Stage 7: 종합
  {
    id: 7,
    name: '최종 시험',
    width: 360,
    height: 650,
    startPosition: { x: 60, y: 570 },
    exit: { x: 280, y: 50, width: 60, height: 50 },
    blocks: [
      // 1층 (시작)
      { type: 'normal', x: 20, y: 600, width: 150, height: 20 },
      { type: 'jump', x: 50, y: 580, width: 80, height: 20 },
      // 2층 - 부서지는 블록
      { type: 'breakable', x: 180, y: 470, width: 100, height: 20 },
      { type: 'normal', x: 280, y: 470, width: 60, height: 20 },
      // 3층 - 폭탄 회피
      { type: 'normal', x: 20, y: 370, width: 100, height: 20 },
      { type: 'bomb', x: 130, y: 370, width: 40, height: 20 },
      { type: 'normal', x: 180, y: 370, width: 100, height: 20 },
      // 4층 - 화살표
      { type: 'normal', x: 200, y: 270, width: 140, height: 20 },
      { type: 'arrow', x: 240, y: 250, width: 70, height: 20, direction: 'up' },
      // 5층
      { type: 'normal', x: 20, y: 170, width: 150, height: 20 },
      // 출구 층
      { type: 'normal', x: 180, y: 100, width: 160, height: 20 },
    ],
  },
];

export function getStage(stageNumber: number): StageData | undefined {
  return stages.find((s) => s.id === stageNumber);
}

export function getTotalStages(): number {
  return stages.length;
}
