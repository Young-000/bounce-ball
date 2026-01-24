/**
 * 게임 진행 상황 저장 서비스
 * - LocalStorage 기반
 * - 스테이지별 클리어 기록 저장
 * - 자동 저장/불러오기
 */

const STORAGE_KEY = 'bounce-ball-save';

// 스테이지별 기록
export interface StageRecord {
  cleared: boolean;
  bestTime: number | null; // 밀리초
  bestDeaths: number | null;
  stars: number; // 0-3
}

// 전체 저장 데이터
export interface SaveData {
  version: number;
  highestClearedStage: number;
  stageRecords: Record<number, StageRecord>;
  totalPlayTime: number; // 밀리초
  createdAt: string;
  updatedAt: string;
}

// 기본 저장 데이터
const createDefaultSaveData = (): SaveData => ({
  version: 1,
  highestClearedStage: 0,
  stageRecords: {},
  totalPlayTime: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

/**
 * 저장 데이터 불러오기
 */
export function loadSaveData(): SaveData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return createDefaultSaveData();
    }
    
    const data = JSON.parse(saved) as SaveData;
    
    // 버전 마이그레이션이 필요하면 여기서 처리
    if (!data.version) {
      data.version = 1;
    }
    
    return data;
  } catch (error) {
    console.error('Failed to load save data:', error);
    return createDefaultSaveData();
  }
}

/**
 * 저장 데이터 저장
 */
export function saveSaveData(data: SaveData): void {
  try {
    data.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save data:', error);
  }
}

/**
 * 스테이지 클리어 기록 저장
 */
export function saveStageRecord(
  stageId: number,
  clearTime: number,
  deathCount: number
): SaveData {
  const data = loadSaveData();
  
  const stars = calculateStars(clearTime, deathCount);
  const existing = data.stageRecords[stageId];
  
  // 새 기록이 더 좋으면 업데이트
  const shouldUpdate = !existing || 
    !existing.cleared ||
    (clearTime < (existing.bestTime ?? Infinity)) ||
    (stars > existing.stars);
  
  if (shouldUpdate) {
    data.stageRecords[stageId] = {
      cleared: true,
      bestTime: existing?.bestTime 
        ? Math.min(existing.bestTime, clearTime)
        : clearTime,
      bestDeaths: existing?.bestDeaths != null
        ? Math.min(existing.bestDeaths, deathCount)
        : deathCount,
      stars: Math.max(existing?.stars ?? 0, stars),
    };
  }
  
  // 최고 클리어 스테이지 업데이트
  if (stageId > data.highestClearedStage) {
    data.highestClearedStage = stageId;
  }
  
  saveSaveData(data);
  return data;
}

/**
 * 별 개수 계산
 */
export function calculateStars(clearTime: number, deathCount: number): number {
  // 30초 이내, 사망 0회 = 3별
  // 60초 이내, 사망 3회 이내 = 2별
  // 그 외 = 1별
  if (clearTime < 30000 && deathCount === 0) return 3;
  if (clearTime < 60000 && deathCount <= 3) return 2;
  return 1;
}

/**
 * 스테이지 잠금 해제 여부 확인
 * - 첫 스테이지는 항상 열림
 * - 이전 스테이지 클리어 시 다음 스테이지 해제
 */
export function isStageUnlocked(stageId: number): boolean {
  if (stageId === 1) return true;
  
  const data = loadSaveData();
  return data.highestClearedStage >= stageId - 1;
}

/**
 * 스테이지 기록 가져오기
 */
export function getStageRecord(stageId: number): StageRecord | null {
  const data = loadSaveData();
  return data.stageRecords[stageId] ?? null;
}

/**
 * 전체 진행률 계산 (%)
 */
export function getProgress(totalStages: number): number {
  const data = loadSaveData();
  const clearedCount = Object.values(data.stageRecords).filter(r => r.cleared).length;
  return Math.round((clearedCount / totalStages) * 100);
}

/**
 * 전체 별 개수
 */
export function getTotalStars(): number {
  const data = loadSaveData();
  return Object.values(data.stageRecords).reduce((sum, r) => sum + r.stars, 0);
}

/**
 * 저장 데이터 초기화 (리셋)
 */
export function resetSaveData(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * 플레이 시간 추가
 */
export function addPlayTime(ms: number): void {
  const data = loadSaveData();
  data.totalPlayTime += ms;
  saveSaveData(data);
}
