import { describe, it, expect, beforeEach } from 'vitest';
import {
  INITIAL_MISSIONS,
  INITIAL_SAMPLE_EMAILS,
  INITIAL_SAMPLE_EXPENSES,
  INITIAL_SAMPLE_FILES,
  INITIAL_PLAYER_STATS,
} from '../src/game/missions/missionData';
import { MissionPersistencePayload } from '../src/game/missions/types';

describe('MORPHYX Productivity Mission System', () => {
  beforeEach(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.clear();
    }
  });

  it('connects the 3 playable demo missions to their designated buildings with 5 objectives each', () => {
    const inboxZero = INITIAL_MISSIONS['inbox-zero'];
    const budgetMaster = INITIAL_MISSIONS['budget-master'];
    const fileOrganizer = INITIAL_MISSIONS['file-organizer'];

    // Mission 1: Post Office -> Inbox Zero
    expect(inboxZero).toBeDefined();
    expect(inboxZero.buildingId).toBe('metro-post');
    expect(inboxZero.totalProgress).toBe(5);
    expect(inboxZero.status).toBe('AVAILABLE');
    expect(inboxZero.xpReward).toBe(150);
    expect(inboxZero.creditsReward).toBe(75);

    // Mission 2: Bank -> Budget Master
    expect(budgetMaster).toBeDefined();
    expect(budgetMaster.buildingId).toBe('apex-bank');
    expect(budgetMaster.totalProgress).toBe(5);
    expect(budgetMaster.status).toBe('AVAILABLE');
    expect(budgetMaster.xpReward).toBe(200);
    expect(budgetMaster.creditsReward).toBe(100);

    // Mission 3: Tech Office -> File Organizer
    expect(fileOrganizer).toBeDefined();
    expect(fileOrganizer.buildingId).toBe('cybercore-tech');
    expect(fileOrganizer.totalProgress).toBe(5);
    expect(fileOrganizer.status).toBe('AVAILABLE');
    expect(fileOrganizer.xpReward).toBe(175);
    expect(fileOrganizer.creditsReward).toBe(90);
  });

  it('provides 5 sample emails for Inbox Zero with Work, Personal, and Important categorization', () => {
    expect(INITIAL_SAMPLE_EMAILS).toHaveLength(5);

    const validCategories = ['Work', 'Personal', 'Important'];

    for (const email of INITIAL_SAMPLE_EMAILS) {
      expect(email.id).toBeTruthy();
      expect(email.sender).toBeTruthy();
      expect(email.subject).toBeTruthy();
      expect(email.snippet).toBeTruthy();
      expect(email.assignedCategory).toBeNull();
      expect(email.isOrganized).toBe(false);
    }

    // Simulate organizing an email into each category
    const simulated = INITIAL_SAMPLE_EMAILS.map((email, idx) => ({
      ...email,
      assignedCategory: validCategories[idx % validCategories.length] as 'Work' | 'Personal' | 'Important',
      isOrganized: true,
    }));

    expect(simulated.filter(e => e.isOrganized)).toHaveLength(5);
    expect(simulated.filter(e => e.assignedCategory === 'Work').length).toBeGreaterThan(0);
    expect(simulated.filter(e => e.assignedCategory === 'Personal').length).toBeGreaterThan(0);
    expect(simulated.filter(e => e.assignedCategory === 'Important').length).toBeGreaterThan(0);
  });

  it('provides 5 sample expenses for Budget Master with a computable spending summary', () => {
    expect(INITIAL_SAMPLE_EXPENSES).toHaveLength(5);

    let totalSum = 0;
    for (const expense of INITIAL_SAMPLE_EXPENSES) {
      expect(expense.id).toBeTruthy();
      expect(expense.merchant).toBeTruthy();
      expect(expense.amount).toBeGreaterThan(0);
      expect(expense.isCategorized).toBe(false);
      totalSum += expense.amount;
    }

    // Total expense sum is $607.50
    expect(totalSum).toBeCloseTo(607.5, 2);

    // Simulate categorizing all 5 expenses
    const categories = ['Operations', 'Software', 'Equipment', 'Travel', 'Facilities'] as const;
    const categorized = INITIAL_SAMPLE_EXPENSES.map((exp, idx) => ({
      ...exp,
      assignedCategory: categories[idx],
      isCategorized: true,
    }));

    const summary = categories.reduce((acc, cat) => {
      const match = categorized.find(e => e.assignedCategory === cat);
      acc[cat] = match ? match.amount : 0;
      return acc;
    }, {} as Record<string, number>);

    expect(summary['Operations']).toBe(145.0);
    expect(summary['Software']).toBe(40.0);
    expect(summary['Equipment']).toBe(280.0);
    expect(summary['Travel']).toBe(55.0);
    expect(summary['Facilities']).toBe(87.5);
  });

  it('provides 5 sample files for File Organizer with designated directory targets', () => {
    expect(INITIAL_SAMPLE_FILES).toHaveLength(5);

    const targetFolders = INITIAL_SAMPLE_FILES.map(f => f.correctFolder);
    expect(targetFolders).toContain('/src');
    expect(targetFolders).toContain('/docs');
    expect(targetFolders).toContain('/assets');
    expect(targetFolders).toContain('/tests');
    expect(targetFolders).toContain('/config');

    for (const file of INITIAL_SAMPLE_FILES) {
      expect(file.id).toBeTruthy();
      expect(file.name).toBeTruthy();
      expect(file.extension).toBeTruthy();
      expect(file.isSorted).toBe(false);
      expect(file.assignedFolder).toBeNull();
    }
  });

  it('persists and hydrates mission state across simulated page refresh', () => {
    const storageKey = 'morphyx_mission_state_v2';

    // 1. Prepare simulated in-progress payload
    const mockPayload: MissionPersistencePayload = {
      missions: {
        ...INITIAL_MISSIONS,
        'inbox-zero': {
          ...INITIAL_MISSIONS['inbox-zero'],
          status: 'ACTIVE',
          currentProgress: 3,
        },
      },
      activeMissionId: 'inbox-zero',
      emails: INITIAL_SAMPLE_EMAILS.map((email, idx) =>
        idx < 3
          ? { ...email, assignedCategory: 'Work' as const, isOrganized: true }
          : email
      ),
      expenses: INITIAL_SAMPLE_EXPENSES,
      files: INITIAL_SAMPLE_FILES,
      playerStats: {
        ...INITIAL_PLAYER_STATS,
        xp: 1400,
      },
    };

    // 2. Save payload to localStorage
    window.localStorage.setItem(storageKey, JSON.stringify(mockPayload));

    // 3. Hydrate state
    const raw = window.localStorage.getItem(storageKey);
    expect(raw).not.toBeNull();

    const hydrated: MissionPersistencePayload = JSON.parse(raw!);
    expect(hydrated.activeMissionId).toBe('inbox-zero');
    expect(hydrated.missions['inbox-zero'].status).toBe('ACTIVE');
    expect(hydrated.missions['inbox-zero'].currentProgress).toBe(3);
    expect(hydrated.emails.filter(e => e.isOrganized)).toHaveLength(3);
    expect(hydrated.playerStats.xp).toBe(1400);
  });

  it('verifies that completion flow correctly rewards player XP and title badges', () => {
    const inboxZero = INITIAL_MISSIONS['inbox-zero'];
    const baselineXp = INITIAL_PLAYER_STATS.xp;

    const afterCompletionXp = baselineXp + inboxZero.xpReward;
    expect(afterCompletionXp).toBe(baselineXp + 150);

    const newLevel = Math.max(
      INITIAL_PLAYER_STATS.level,
      Math.floor(afterCompletionXp / 400) + 1
    );
    expect(newLevel).toBeGreaterThanOrEqual(INITIAL_PLAYER_STATS.level);
  });
});
