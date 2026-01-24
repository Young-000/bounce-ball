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
    height: 500,
    startPosition: { x: 60, y: 420 },
    exit: { x: 280, y: 80, width: 60, height: 50 },
    blocks: [
      // 1층 (시작)
      { type: 'normal', x: 20, y: 450, width: 140, height: 20 },
      // 점프 블록 (위에 올려놓기)
      { type: 'jump', x: 50, y: 430, width: 80, height: 20 },
      // 2층 - 점프 블록으로 높이 뛰어서 도달 (간격 ~130px, 점프블록 사용)
      { type: 'normal', x: 180, y: 320, width: 160, height: 20 },
      // 3층 (간격 90px)
      { type: 'normal', x: 20, y: 230, width: 160, height: 20 },
      // 출구 층 (간격 90px)
      { type: 'normal', x: 180, y: 140, width: 160, height: 20 },
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
  // 간격: 90px (안전 마진 확보)
  {
    id: 5,
    name: '위험한 길',
    width: 360,
    height: 550,
    startPosition: { x: 60, y: 470 },
    exit: { x: 280, y: 100, width: 60, height: 50 },
    blocks: [
      // 1층 (시작) y=500
      { type: 'normal', x: 20, y: 500, width: 130, height: 20 },
      { type: 'bomb', x: 160, y: 500, width: 40, height: 20 },
      { type: 'normal', x: 210, y: 500, width: 130, height: 20 },
      // 2층 y=410 (간격 90px)
      { type: 'normal', x: 200, y: 410, width: 140, height: 20 },
      { type: 'bomb', x: 150, y: 410, width: 40, height: 20 },
      { type: 'normal', x: 20, y: 410, width: 120, height: 20 },
      // 3층 y=320 (간격 90px)
      { type: 'normal', x: 20, y: 320, width: 130, height: 20 },
      { type: 'bomb', x: 160, y: 320, width: 40, height: 20 },
      { type: 'normal', x: 210, y: 320, width: 130, height: 20 },
      // 4층 y=230 (간격 90px)
      { type: 'normal', x: 200, y: 230, width: 140, height: 20 },
      // 출구 층 y=150 (간격 80px)
      { type: 'normal', x: 180, y: 150, width: 160, height: 20 },
    ],
  },

  // Stage 6: 화살표 블록
  // 화살표 최대 높이: ~166px, 안전하게 150px 간격 사용
  {
    id: 6,
    name: '발사!',
    width: 360,
    height: 600,
    startPosition: { x: 60, y: 520 },
    exit: { x: 280, y: 80, width: 60, height: 50 },
    blocks: [
      // 1층 (시작) y=550
      { type: 'normal', x: 20, y: 550, width: 150, height: 20 },
      // 위로 발사
      { type: 'arrow', x: 60, y: 530, width: 70, height: 20, direction: 'up' },
      // 2층 y=400 (간격 150px - 화살표로 도달)
      { type: 'normal', x: 180, y: 400, width: 160, height: 20 },
      // 왼쪽으로 발사
      { type: 'arrow', x: 230, y: 380, width: 70, height: 20, direction: 'left' },
      // 3층 y=260 (간격 140px - 왼쪽 이동 + 일반 점프)
      { type: 'normal', x: 20, y: 260, width: 150, height: 20 },
      // 위로 발사
      { type: 'arrow', x: 60, y: 240, width: 70, height: 20, direction: 'up' },
      // 출구 층 y=130 (간격 130px - 화살표로 도달)
      { type: 'normal', x: 180, y: 130, width: 160, height: 20 },
    ],
  },

  // Stage 7: 종합
  // 모든 블록 타입 활용, 간격 90px 기준
  {
    id: 7,
    name: '최종 시험',
    width: 360,
    height: 650,
    startPosition: { x: 60, y: 570 },
    exit: { x: 280, y: 80, width: 60, height: 50 },
    blocks: [
      // 1층 (시작) y=600
      { type: 'normal', x: 20, y: 600, width: 150, height: 20 },
      { type: 'jump', x: 50, y: 580, width: 80, height: 20 },
      // 2층 y=470 (간격 130px - 점프블록으로 도달)
      { type: 'breakable', x: 180, y: 470, width: 100, height: 20 },
      { type: 'normal', x: 280, y: 470, width: 60, height: 20 },
      // 3층 y=380 (간격 90px)
      { type: 'normal', x: 20, y: 380, width: 100, height: 20 },
      { type: 'bomb', x: 130, y: 380, width: 40, height: 20 },
      { type: 'normal', x: 180, y: 380, width: 100, height: 20 },
      // 4층 y=290 (간격 90px)
      { type: 'normal', x: 200, y: 290, width: 140, height: 20 },
      { type: 'arrow', x: 240, y: 270, width: 70, height: 20, direction: 'up' },
      // 5층 y=200 (간격 90px)
      { type: 'normal', x: 20, y: 200, width: 150, height: 20 },
      // 출구 층 y=130 (간격 70px)
      { type: 'normal', x: 180, y: 130, width: 160, height: 20 },
    ],
  },

  // ============================================
  // Stage 8-15: 중급 스테이지
  // ============================================

  // Stage 8: 지그재그
  {
    id: 8,
    name: '지그재그',
    width: 360,
    height: 600,
    startPosition: { x: 60, y: 550 },
    exit: { x: 280, y: 60, width: 60, height: 50 },
    blocks: [
      { type: 'normal', x: 20, y: 580, width: 120, height: 20 },
      { type: 'normal', x: 220, y: 500, width: 120, height: 20 },
      { type: 'normal', x: 20, y: 420, width: 120, height: 20 },
      { type: 'normal', x: 220, y: 340, width: 120, height: 20 },
      { type: 'normal', x: 20, y: 260, width: 120, height: 20 },
      { type: 'normal', x: 220, y: 180, width: 120, height: 20 },
      { type: 'normal', x: 20, y: 110, width: 320, height: 20 },
    ],
  },

  // Stage 9: 부서지는 다리
  {
    id: 9,
    name: '위태로운 다리',
    width: 360,
    height: 500,
    startPosition: { x: 60, y: 70 },
    exit: { x: 280, y: 400, width: 60, height: 50 },
    blocks: [
      { type: 'normal', x: 20, y: 100, width: 80, height: 20 },
      { type: 'breakable', x: 110, y: 100, width: 60, height: 20 },
      { type: 'breakable', x: 180, y: 100, width: 60, height: 20 },
      { type: 'breakable', x: 250, y: 100, width: 60, height: 20 },
      { type: 'normal', x: 260, y: 200, width: 80, height: 20 },
      { type: 'breakable', x: 100, y: 200, width: 80, height: 20 },
      { type: 'breakable', x: 190, y: 200, width: 60, height: 20 },
      { type: 'normal', x: 20, y: 300, width: 80, height: 20 },
      { type: 'breakable', x: 110, y: 300, width: 80, height: 20 },
      { type: 'normal', x: 200, y: 450, width: 140, height: 20 },
    ],
  },

  // Stage 10: 벽타기
  {
    id: 10,
    name: '벽타기',
    width: 360,
    height: 650,
    startPosition: { x: 60, y: 600 },
    exit: { x: 280, y: 60, width: 60, height: 50 },
    blocks: [
      { type: 'normal', x: 20, y: 630, width: 100, height: 20 },
      { type: 'normal', x: 0, y: 540, width: 80, height: 20 },
      { type: 'normal', x: 280, y: 450, width: 80, height: 20 },
      { type: 'normal', x: 0, y: 360, width: 80, height: 20 },
      { type: 'normal', x: 280, y: 270, width: 80, height: 20 },
      { type: 'normal', x: 0, y: 180, width: 80, height: 20 },
      { type: 'normal', x: 200, y: 110, width: 140, height: 20 },
    ],
  },

  // Stage 11: 폭탄 지대
  {
    id: 11,
    name: '폭탄 지대',
    width: 360,
    height: 600,
    startPosition: { x: 60, y: 550 },
    exit: { x: 280, y: 60, width: 60, height: 50 },
    blocks: [
      { type: 'normal', x: 20, y: 580, width: 80, height: 20 },
      { type: 'bomb', x: 110, y: 580, width: 40, height: 20 },
      { type: 'normal', x: 160, y: 580, width: 60, height: 20 },
      { type: 'bomb', x: 230, y: 580, width: 40, height: 20 },
      { type: 'normal', x: 280, y: 580, width: 60, height: 20 },
      { type: 'normal', x: 200, y: 490, width: 80, height: 20 },
      { type: 'bomb', x: 150, y: 490, width: 40, height: 20 },
      { type: 'normal', x: 60, y: 490, width: 80, height: 20 },
      { type: 'normal', x: 20, y: 400, width: 80, height: 20 },
      { type: 'bomb', x: 110, y: 400, width: 40, height: 20 },
      { type: 'normal', x: 160, y: 400, width: 80, height: 20 },
      { type: 'normal', x: 260, y: 310, width: 80, height: 20 },
      { type: 'normal', x: 120, y: 220, width: 120, height: 20 },
      { type: 'normal', x: 200, y: 110, width: 140, height: 20 },
    ],
  },

  // Stage 12: 화살표 체인
  {
    id: 12,
    name: '화살표 체인',
    width: 360,
    height: 650,
    startPosition: { x: 60, y: 600 },
    exit: { x: 160, y: 60, width: 60, height: 50 },
    blocks: [
      { type: 'normal', x: 20, y: 630, width: 120, height: 20 },
      { type: 'arrow', x: 50, y: 610, width: 60, height: 20, direction: 'up' },
      { type: 'normal', x: 220, y: 480, width: 120, height: 20 },
      { type: 'arrow', x: 250, y: 460, width: 60, height: 20, direction: 'left' },
      { type: 'normal', x: 20, y: 330, width: 120, height: 20 },
      { type: 'arrow', x: 50, y: 310, width: 60, height: 20, direction: 'up' },
      { type: 'normal', x: 220, y: 180, width: 120, height: 20 },
      { type: 'arrow', x: 250, y: 160, width: 60, height: 20, direction: 'left' },
      { type: 'normal', x: 120, y: 110, width: 120, height: 20 },
    ],
  },

  // Stage 13: 점프 릴레이
  {
    id: 13,
    name: '점프 릴레이',
    width: 360,
    height: 700,
    startPosition: { x: 60, y: 650 },
    exit: { x: 280, y: 60, width: 60, height: 50 },
    blocks: [
      { type: 'normal', x: 20, y: 680, width: 100, height: 20 },
      { type: 'jump', x: 40, y: 660, width: 60, height: 20 },
      { type: 'normal', x: 200, y: 530, width: 100, height: 20 },
      { type: 'jump', x: 220, y: 510, width: 60, height: 20 },
      { type: 'normal', x: 20, y: 380, width: 100, height: 20 },
      { type: 'jump', x: 40, y: 360, width: 60, height: 20 },
      { type: 'normal', x: 200, y: 230, width: 100, height: 20 },
      { type: 'jump', x: 220, y: 210, width: 60, height: 20 },
      { type: 'normal', x: 200, y: 110, width: 140, height: 20 },
    ],
  },

  // Stage 14: 혼합 코스 1
  {
    id: 14,
    name: '혼합 코스',
    width: 360,
    height: 650,
    startPosition: { x: 60, y: 600 },
    exit: { x: 280, y: 60, width: 60, height: 50 },
    blocks: [
      { type: 'normal', x: 20, y: 630, width: 120, height: 20 },
      { type: 'jump', x: 50, y: 610, width: 60, height: 20 },
      { type: 'breakable', x: 200, y: 480, width: 80, height: 20 },
      { type: 'normal', x: 280, y: 480, width: 60, height: 20 },
      { type: 'normal', x: 20, y: 390, width: 80, height: 20 },
      { type: 'bomb', x: 110, y: 390, width: 40, height: 20 },
      { type: 'normal', x: 160, y: 390, width: 80, height: 20 },
      { type: 'normal', x: 260, y: 300, width: 80, height: 20 },
      { type: 'arrow', x: 270, y: 280, width: 60, height: 20, direction: 'up' },
      { type: 'normal', x: 100, y: 170, width: 160, height: 20 },
      { type: 'normal', x: 200, y: 110, width: 140, height: 20 },
    ],
  },

  // Stage 15: 나선 탑
  {
    id: 15,
    name: '나선 탑',
    width: 360,
    height: 750,
    startPosition: { x: 180, y: 700 },
    exit: { x: 150, y: 60, width: 60, height: 50 },
    blocks: [
      { type: 'normal', x: 130, y: 730, width: 100, height: 20 },
      { type: 'normal', x: 260, y: 650, width: 80, height: 20 },
      { type: 'normal', x: 20, y: 570, width: 80, height: 20 },
      { type: 'normal', x: 260, y: 490, width: 80, height: 20 },
      { type: 'normal', x: 20, y: 410, width: 80, height: 20 },
      { type: 'normal', x: 260, y: 330, width: 80, height: 20 },
      { type: 'normal', x: 20, y: 250, width: 80, height: 20 },
      { type: 'normal', x: 260, y: 170, width: 80, height: 20 },
      { type: 'normal', x: 120, y: 110, width: 120, height: 20 },
    ],
  },

  // ============================================
  // Stage 16-22: 고급 스테이지
  // ============================================

  // Stage 16: 좁은 발판
  {
    id: 16,
    name: '외줄타기',
    width: 360,
    height: 600,
    startPosition: { x: 60, y: 550 },
    exit: { x: 280, y: 60, width: 60, height: 50 },
    blocks: [
      { type: 'normal', x: 30, y: 580, width: 60, height: 20 },
      { type: 'normal', x: 150, y: 500, width: 60, height: 20 },
      { type: 'normal', x: 270, y: 420, width: 60, height: 20 },
      { type: 'normal', x: 150, y: 340, width: 60, height: 20 },
      { type: 'normal', x: 30, y: 260, width: 60, height: 20 },
      { type: 'normal', x: 150, y: 180, width: 60, height: 20 },
      { type: 'normal', x: 260, y: 110, width: 80, height: 20 },
    ],
  },

  // Stage 17: 타이밍 점프
  {
    id: 17,
    name: '타이밍',
    width: 360,
    height: 550,
    startPosition: { x: 60, y: 70 },
    exit: { x: 280, y: 450, width: 60, height: 50 },
    blocks: [
      { type: 'normal', x: 20, y: 100, width: 80, height: 20 },
      { type: 'breakable', x: 120, y: 100, width: 60, height: 20 },
      { type: 'bomb', x: 200, y: 100, width: 40, height: 20 },
      { type: 'breakable', x: 260, y: 100, width: 80, height: 20 },
      { type: 'normal', x: 260, y: 200, width: 80, height: 20 },
      { type: 'breakable', x: 140, y: 200, width: 100, height: 20 },
      { type: 'bomb', x: 80, y: 200, width: 40, height: 20 },
      { type: 'normal', x: 20, y: 300, width: 80, height: 20 },
      { type: 'breakable', x: 120, y: 300, width: 80, height: 20 },
      { type: 'normal', x: 220, y: 400, width: 60, height: 20 },
      { type: 'normal', x: 200, y: 500, width: 140, height: 20 },
    ],
  },

  // Stage 18: 화살표 미로
  {
    id: 18,
    name: '화살표 미로',
    width: 360,
    height: 700,
    startPosition: { x: 60, y: 650 },
    exit: { x: 160, y: 60, width: 60, height: 50 },
    blocks: [
      { type: 'normal', x: 20, y: 680, width: 100, height: 20 },
      { type: 'arrow', x: 40, y: 660, width: 60, height: 20, direction: 'right' },
      { type: 'normal', x: 260, y: 600, width: 80, height: 20 },
      { type: 'arrow', x: 270, y: 580, width: 60, height: 20, direction: 'up' },
      { type: 'normal', x: 260, y: 450, width: 80, height: 20 },
      { type: 'arrow', x: 270, y: 430, width: 60, height: 20, direction: 'left' },
      { type: 'normal', x: 20, y: 370, width: 80, height: 20 },
      { type: 'arrow', x: 30, y: 350, width: 60, height: 20, direction: 'up' },
      { type: 'normal', x: 20, y: 220, width: 80, height: 20 },
      { type: 'arrow', x: 30, y: 200, width: 60, height: 20, direction: 'right' },
      { type: 'normal', x: 130, y: 110, width: 100, height: 20 },
    ],
  },

  // Stage 19: 수직 상승
  {
    id: 19,
    name: '수직 상승',
    width: 360,
    height: 800,
    startPosition: { x: 180, y: 750 },
    exit: { x: 150, y: 60, width: 60, height: 50 },
    blocks: [
      { type: 'normal', x: 140, y: 780, width: 80, height: 20 },
      { type: 'jump', x: 150, y: 760, width: 60, height: 20 },
      { type: 'normal', x: 140, y: 620, width: 80, height: 20 },
      { type: 'jump', x: 150, y: 600, width: 60, height: 20 },
      { type: 'normal', x: 140, y: 460, width: 80, height: 20 },
      { type: 'jump', x: 150, y: 440, width: 60, height: 20 },
      { type: 'normal', x: 140, y: 300, width: 80, height: 20 },
      { type: 'arrow', x: 150, y: 280, width: 60, height: 20, direction: 'up' },
      { type: 'normal', x: 130, y: 110, width: 100, height: 20 },
    ],
  },

  // Stage 20: 낙하 회피
  {
    id: 20,
    name: '낙하 회피',
    width: 360,
    height: 600,
    startPosition: { x: 60, y: 70 },
    exit: { x: 280, y: 500, width: 60, height: 50 },
    blocks: [
      { type: 'normal', x: 20, y: 100, width: 100, height: 20 },
      { type: 'bomb', x: 180, y: 180, width: 50, height: 20 },
      { type: 'normal', x: 260, y: 180, width: 80, height: 20 },
      { type: 'bomb', x: 100, y: 260, width: 50, height: 20 },
      { type: 'normal', x: 20, y: 260, width: 70, height: 20 },
      { type: 'bomb', x: 220, y: 340, width: 50, height: 20 },
      { type: 'normal', x: 280, y: 340, width: 60, height: 20 },
      { type: 'bomb', x: 80, y: 420, width: 50, height: 20 },
      { type: 'normal', x: 140, y: 420, width: 100, height: 20 },
      { type: 'normal', x: 220, y: 550, width: 120, height: 20 },
    ],
  },

  // Stage 21: 복합 장애물
  {
    id: 21,
    name: '복합 장애물',
    width: 360,
    height: 700,
    startPosition: { x: 60, y: 650 },
    exit: { x: 280, y: 60, width: 60, height: 50 },
    blocks: [
      { type: 'normal', x: 20, y: 680, width: 100, height: 20 },
      { type: 'bomb', x: 130, y: 680, width: 40, height: 20 },
      { type: 'jump', x: 180, y: 660, width: 60, height: 20 },
      { type: 'normal', x: 180, y: 680, width: 80, height: 20 },
      { type: 'breakable', x: 240, y: 530, width: 100, height: 20 },
      { type: 'normal', x: 20, y: 440, width: 80, height: 20 },
      { type: 'arrow', x: 30, y: 420, width: 60, height: 20, direction: 'right' },
      { type: 'normal', x: 260, y: 350, width: 80, height: 20 },
      { type: 'bomb', x: 180, y: 350, width: 40, height: 20 },
      { type: 'normal', x: 100, y: 350, width: 70, height: 20 },
      { type: 'normal', x: 20, y: 260, width: 80, height: 20 },
      { type: 'jump', x: 30, y: 240, width: 60, height: 20 },
      { type: 'normal', x: 200, y: 110, width: 140, height: 20 },
    ],
  },

  // Stage 22: 정밀 착지
  {
    id: 22,
    name: '정밀 착지',
    width: 360,
    height: 650,
    startPosition: { x: 60, y: 600 },
    exit: { x: 280, y: 60, width: 60, height: 50 },
    blocks: [
      { type: 'normal', x: 30, y: 630, width: 50, height: 20 },
      { type: 'normal', x: 155, y: 550, width: 50, height: 20 },
      { type: 'normal', x: 280, y: 470, width: 50, height: 20 },
      { type: 'normal', x: 155, y: 390, width: 50, height: 20 },
      { type: 'normal', x: 30, y: 310, width: 50, height: 20 },
      { type: 'normal', x: 155, y: 230, width: 50, height: 20 },
      { type: 'normal', x: 280, y: 150, width: 50, height: 20 },
      { type: 'normal', x: 260, y: 110, width: 80, height: 20 },
    ],
  },

  // ============================================
  // Stage 23-30: 마스터 스테이지
  // ============================================

  // Stage 23: 극한 계단
  {
    id: 23,
    name: '극한 계단',
    width: 360,
    height: 850,
    startPosition: { x: 60, y: 800 },
    exit: { x: 280, y: 60, width: 60, height: 50 },
    blocks: [
      { type: 'normal', x: 20, y: 830, width: 60, height: 20 },
      { type: 'normal', x: 100, y: 750, width: 60, height: 20 },
      { type: 'normal', x: 180, y: 670, width: 60, height: 20 },
      { type: 'normal', x: 260, y: 590, width: 60, height: 20 },
      { type: 'normal', x: 180, y: 510, width: 60, height: 20 },
      { type: 'normal', x: 100, y: 430, width: 60, height: 20 },
      { type: 'normal', x: 20, y: 350, width: 60, height: 20 },
      { type: 'normal', x: 100, y: 270, width: 60, height: 20 },
      { type: 'normal', x: 180, y: 190, width: 60, height: 20 },
      { type: 'normal', x: 260, y: 110, width: 80, height: 20 },
    ],
  },

  // Stage 24: 폭탄 미로
  {
    id: 24,
    name: '폭탄 미로',
    width: 360,
    height: 700,
    startPosition: { x: 60, y: 650 },
    exit: { x: 280, y: 60, width: 60, height: 50 },
    blocks: [
      { type: 'normal', x: 20, y: 680, width: 60, height: 20 },
      { type: 'bomb', x: 90, y: 680, width: 30, height: 20 },
      { type: 'normal', x: 130, y: 680, width: 60, height: 20 },
      { type: 'bomb', x: 200, y: 680, width: 30, height: 20 },
      { type: 'normal', x: 240, y: 680, width: 60, height: 20 },
      { type: 'normal', x: 260, y: 590, width: 60, height: 20 },
      { type: 'bomb', x: 200, y: 590, width: 30, height: 20 },
      { type: 'normal', x: 120, y: 590, width: 60, height: 20 },
      { type: 'normal', x: 20, y: 500, width: 60, height: 20 },
      { type: 'bomb', x: 90, y: 500, width: 30, height: 20 },
      { type: 'normal', x: 130, y: 500, width: 60, height: 20 },
      { type: 'normal', x: 260, y: 410, width: 60, height: 20 },
      { type: 'bomb', x: 180, y: 410, width: 30, height: 20 },
      { type: 'normal', x: 100, y: 410, width: 60, height: 20 },
      { type: 'normal', x: 20, y: 320, width: 60, height: 20 },
      { type: 'normal', x: 180, y: 230, width: 80, height: 20 },
      { type: 'normal', x: 260, y: 110, width: 80, height: 20 },
    ],
  },

  // Stage 25: 화살표 릴레이
  {
    id: 25,
    name: '화살표 릴레이',
    width: 360,
    height: 800,
    startPosition: { x: 180, y: 750 },
    exit: { x: 150, y: 60, width: 60, height: 50 },
    blocks: [
      { type: 'normal', x: 140, y: 780, width: 80, height: 20 },
      { type: 'arrow', x: 150, y: 760, width: 60, height: 20, direction: 'up' },
      { type: 'normal', x: 140, y: 620, width: 80, height: 20 },
      { type: 'arrow', x: 150, y: 600, width: 60, height: 20, direction: 'up' },
      { type: 'normal', x: 140, y: 460, width: 80, height: 20 },
      { type: 'arrow', x: 150, y: 440, width: 60, height: 20, direction: 'up' },
      { type: 'normal', x: 140, y: 300, width: 80, height: 20 },
      { type: 'arrow', x: 150, y: 280, width: 60, height: 20, direction: 'up' },
      { type: 'normal', x: 130, y: 110, width: 100, height: 20 },
    ],
  },

  // Stage 26: 부서지는 탑
  {
    id: 26,
    name: '부서지는 탑',
    width: 360,
    height: 750,
    startPosition: { x: 60, y: 70 },
    exit: { x: 280, y: 650, width: 60, height: 50 },
    blocks: [
      { type: 'normal', x: 20, y: 100, width: 80, height: 20 },
      { type: 'breakable', x: 110, y: 100, width: 60, height: 20 },
      { type: 'breakable', x: 180, y: 100, width: 60, height: 20 },
      { type: 'normal', x: 250, y: 100, width: 90, height: 20 },
      { type: 'breakable', x: 250, y: 200, width: 80, height: 20 },
      { type: 'breakable', x: 150, y: 200, width: 80, height: 20 },
      { type: 'normal', x: 20, y: 300, width: 80, height: 20 },
      { type: 'breakable', x: 110, y: 300, width: 80, height: 20 },
      { type: 'breakable', x: 200, y: 300, width: 80, height: 20 },
      { type: 'normal', x: 280, y: 400, width: 60, height: 20 },
      { type: 'breakable', x: 140, y: 400, width: 120, height: 20 },
      { type: 'normal', x: 20, y: 500, width: 80, height: 20 },
      { type: 'breakable', x: 110, y: 500, width: 100, height: 20 },
      { type: 'normal', x: 220, y: 600, width: 60, height: 20 },
      { type: 'normal', x: 220, y: 700, width: 120, height: 20 },
    ],
  },

  // Stage 27: 최종 도전 1
  {
    id: 27,
    name: '최종 도전 I',
    width: 360,
    height: 800,
    startPosition: { x: 60, y: 750 },
    exit: { x: 280, y: 60, width: 60, height: 50 },
    blocks: [
      { type: 'normal', x: 20, y: 780, width: 80, height: 20 },
      { type: 'jump', x: 30, y: 760, width: 60, height: 20 },
      { type: 'breakable', x: 200, y: 630, width: 80, height: 20 },
      { type: 'normal', x: 280, y: 630, width: 60, height: 20 },
      { type: 'normal', x: 20, y: 540, width: 60, height: 20 },
      { type: 'bomb', x: 90, y: 540, width: 30, height: 20 },
      { type: 'normal', x: 130, y: 540, width: 60, height: 20 },
      { type: 'normal', x: 260, y: 450, width: 80, height: 20 },
      { type: 'arrow', x: 270, y: 430, width: 60, height: 20, direction: 'up' },
      { type: 'normal', x: 260, y: 290, width: 80, height: 20 },
      { type: 'normal', x: 20, y: 200, width: 80, height: 20 },
      { type: 'jump', x: 30, y: 180, width: 60, height: 20 },
      { type: 'normal', x: 260, y: 110, width: 80, height: 20 },
    ],
  },

  // Stage 28: 최종 도전 2
  {
    id: 28,
    name: '최종 도전 II',
    width: 360,
    height: 850,
    startPosition: { x: 180, y: 800 },
    exit: { x: 150, y: 60, width: 60, height: 50 },
    blocks: [
      { type: 'normal', x: 140, y: 830, width: 80, height: 20 },
      { type: 'bomb', x: 80, y: 750, width: 30, height: 20 },
      { type: 'normal', x: 20, y: 750, width: 50, height: 20 },
      { type: 'bomb', x: 250, y: 750, width: 30, height: 20 },
      { type: 'normal', x: 290, y: 750, width: 50, height: 20 },
      { type: 'normal', x: 260, y: 660, width: 60, height: 20 },
      { type: 'arrow', x: 270, y: 640, width: 50, height: 20, direction: 'left' },
      { type: 'normal', x: 20, y: 570, width: 60, height: 20 },
      { type: 'arrow', x: 30, y: 550, width: 50, height: 20, direction: 'right' },
      { type: 'breakable', x: 240, y: 480, width: 80, height: 20 },
      { type: 'normal', x: 100, y: 390, width: 60, height: 20 },
      { type: 'jump', x: 110, y: 370, width: 50, height: 20 },
      { type: 'normal', x: 260, y: 240, width: 60, height: 20 },
      { type: 'normal', x: 20, y: 150, width: 60, height: 20 },
      { type: 'normal', x: 130, y: 110, width: 100, height: 20 },
    ],
  },

  // Stage 29: 최종 도전 3
  {
    id: 29,
    name: '최종 도전 III',
    width: 360,
    height: 900,
    startPosition: { x: 60, y: 850 },
    exit: { x: 280, y: 60, width: 60, height: 50 },
    blocks: [
      { type: 'normal', x: 20, y: 880, width: 60, height: 20 },
      { type: 'breakable', x: 100, y: 880, width: 50, height: 20 },
      { type: 'bomb', x: 160, y: 880, width: 30, height: 20 },
      { type: 'normal', x: 200, y: 880, width: 60, height: 20 },
      { type: 'normal', x: 280, y: 790, width: 60, height: 20 },
      { type: 'arrow', x: 290, y: 770, width: 50, height: 20, direction: 'up' },
      { type: 'normal', x: 280, y: 620, width: 60, height: 20 },
      { type: 'normal', x: 20, y: 530, width: 60, height: 20 },
      { type: 'jump', x: 30, y: 510, width: 50, height: 20 },
      { type: 'breakable', x: 200, y: 380, width: 80, height: 20 },
      { type: 'normal', x: 280, y: 380, width: 60, height: 20 },
      { type: 'normal', x: 20, y: 290, width: 60, height: 20 },
      { type: 'bomb', x: 100, y: 290, width: 30, height: 20 },
      { type: 'normal', x: 150, y: 290, width: 60, height: 20 },
      { type: 'normal', x: 280, y: 200, width: 60, height: 20 },
      { type: 'normal', x: 260, y: 110, width: 80, height: 20 },
    ],
  },

  // Stage 30: 마스터
  {
    id: 30,
    name: '마스터',
    width: 360,
    height: 950,
    startPosition: { x: 60, y: 900 },
    exit: { x: 150, y: 60, width: 60, height: 50 },
    blocks: [
      // 시작 구간
      { type: 'normal', x: 20, y: 930, width: 60, height: 20 },
      { type: 'jump', x: 30, y: 910, width: 50, height: 20 },
      // 폭탄 구간
      { type: 'normal', x: 200, y: 780, width: 50, height: 20 },
      { type: 'bomb', x: 260, y: 780, width: 30, height: 20 },
      { type: 'normal', x: 300, y: 780, width: 40, height: 20 },
      // 부서지는 구간
      { type: 'breakable', x: 20, y: 690, width: 60, height: 20 },
      { type: 'breakable', x: 90, y: 690, width: 60, height: 20 },
      { type: 'normal', x: 160, y: 690, width: 60, height: 20 },
      // 화살표 구간
      { type: 'normal', x: 280, y: 600, width: 60, height: 20 },
      { type: 'arrow', x: 290, y: 580, width: 50, height: 20, direction: 'up' },
      { type: 'normal', x: 280, y: 430, width: 60, height: 20 },
      { type: 'arrow', x: 290, y: 410, width: 50, height: 20, direction: 'left' },
      // 정밀 구간
      { type: 'normal', x: 20, y: 340, width: 50, height: 20 },
      { type: 'normal', x: 155, y: 260, width: 50, height: 20 },
      { type: 'normal', x: 290, y: 180, width: 50, height: 20 },
      // 최종 구간
      { type: 'normal', x: 130, y: 110, width: 100, height: 20 },
    ],
  },
];

export function getStage(stageNumber: number): StageData | undefined {
  return stages.find((s) => s.id === stageNumber);
}

export function getTotalStages(): number {
  return stages.length;
}
