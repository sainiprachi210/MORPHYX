import { LevelInfo } from './types';

/**
 * MORPHYX Level Progression Thresholds
 * Level 1: 0 XP
 * Level 2: 200 XP (+200)
 * Level 3: 500 XP (+300)
 * Level 4: 900 XP (+400)
 * Level 5: 1400 XP (+500)
 * Level 6: 2000 XP (+600)
 * Level 7: 2700 XP (+700)
 * Level 8: 3500 XP (+800)
 * Level 9: 4400 XP (+900)
 * Level 10: 5400 XP (+1000)
 */
export const LEVEL_THRESHOLDS: number[] = [
  0,     // Level 1
  200,   // Level 2
  500,   // Level 3
  900,   // Level 4
  1400,  // Level 5
  2000,  // Level 6
  2700,  // Level 7
  3500,  // Level 8
  4400,  // Level 9
  5400,  // Level 10
];

/**
 * Calculates current player level, progress percentage, and XP needed to next level.
 */
export function calculateLevelInfo(xp: number): LevelInfo {
  const safeXp = Math.max(0, Math.floor(xp || 0));

  // Determine which bracket safeXp falls into
  let levelIndex = 0;
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (safeXp >= LEVEL_THRESHOLDS[i]) {
      levelIndex = i;
      break;
    }
  }

  const level = levelIndex + 1;
  const baseXp = LEVEL_THRESHOLDS[levelIndex];

  let targetXp: number;
  let nextLevelXp: number;

  if (levelIndex < LEVEL_THRESHOLDS.length - 1) {
    targetXp = LEVEL_THRESHOLDS[levelIndex + 1];
    nextLevelXp = targetXp - baseXp;
  } else {
    // For levels beyond predefined array, continue with (level + 1) * 100 delta
    nextLevelXp = (level + 1) * 100;
    targetXp = baseXp + nextLevelXp;
  }

  const currentLevelXp = safeXp - baseXp;
  const xpToNextLevel = Math.max(0, targetXp - safeXp);
  const progressPercent = Math.min(
    100,
    Math.max(0, Math.round((currentLevelXp / nextLevelXp) * 100))
  );

  return {
    level,
    currentLevelXp,
    nextLevelXp,
    progressPercent,
    xpToNextLevel,
    baseXp,
    targetXp,
  };
}
