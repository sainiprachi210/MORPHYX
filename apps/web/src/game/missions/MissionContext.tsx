import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import {
  MissionId,
  ProductivityMission,
  EmailItem,
  EmailCategory,
  ExpenseItem,
  ExpenseCategory,
  FileItem,
  FileFolder,
  PlayerStats,
  LevelInfo,
  MissionNotificationData,
  MissionPersistencePayload,
} from './types';
import {
  INITIAL_MISSIONS,
  INITIAL_SAMPLE_EMAILS,
  INITIAL_SAMPLE_EXPENSES,
  INITIAL_SAMPLE_FILES,
  INITIAL_PLAYER_STATS,
} from './missionData';
import { calculateLevelInfo } from './levelProgression';

const STORAGE_KEY = 'morphyx_mission_state_v2';

interface SpendingSummary {
  totalSpent: number;
  categorizedSpent: number;
  breakdown: Record<ExpenseCategory, { amount: number; count: number }>;
}

export interface MissionContextValue {
  missions: Record<string, ProductivityMission>;
  activeMissionId: MissionId | null;
  activeMission: ProductivityMission | null;
  emails: EmailItem[];
  expenses: ExpenseItem[];
  files: FileItem[];
  playerStats: PlayerStats;
  levelInfo: LevelInfo;
  spendingSummary: SpendingSummary;
  notification: MissionNotificationData | null;
  dismissNotification: () => void;
  acceptMission: (id: MissionId) => void;
  declineMission: (id: MissionId) => void;
  abandonMission: (id: MissionId) => void;
  categorizeEmail: (id: string, category: EmailCategory) => void;
  categorizeExpense: (id: string, category: ExpenseCategory) => void;
  sortFile: (id: string, folder: FileFolder) => void;
  completeMission: (id: MissionId) => void;
  replayMission: (id: MissionId) => void;
  resetDemoMissions: () => void;
  getMissionForBuilding: (buildingId: string) => ProductivityMission | null;
}

const MissionContext = createContext<MissionContextValue | null>(null);

function loadInitialState(): MissionPersistencePayload {
  if (typeof window === 'undefined') {
    return {
      missions: INITIAL_MISSIONS,
      activeMissionId: null,
      emails: INITIAL_SAMPLE_EMAILS,
      expenses: INITIAL_SAMPLE_EXPENSES,
      files: INITIAL_SAMPLE_FILES,
      playerStats: INITIAL_PLAYER_STATS,
    };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        missions: INITIAL_MISSIONS,
        activeMissionId: null,
        emails: INITIAL_SAMPLE_EMAILS,
        expenses: INITIAL_SAMPLE_EXPENSES,
        files: INITIAL_SAMPLE_FILES,
        playerStats: INITIAL_PLAYER_STATS,
      };
    }
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === 'object' &&
      parsed.missions &&
      Array.isArray(parsed.emails) &&
      Array.isArray(parsed.expenses) &&
      Array.isArray(parsed.files) &&
      parsed.playerStats
    ) {
      // Sync missions with latest reward specifications
      const mergedMissions: Record<string, ProductivityMission> = { ...INITIAL_MISSIONS };
      for (const key of Object.keys(parsed.missions)) {
        if (mergedMissions[key]) {
          mergedMissions[key] = {
            ...mergedMissions[key],
            ...parsed.missions[key],
            xpReward: INITIAL_MISSIONS[key].xpReward,
            coinsReward: INITIAL_MISSIONS[key].coinsReward,
            creditsReward: INITIAL_MISSIONS[key].creditsReward,
          };
        }
      }

      const coins =
        typeof parsed.playerStats.coins === 'number'
          ? parsed.playerStats.coins
          : (parsed.playerStats.credits || 0);
      const xp = typeof parsed.playerStats.xp === 'number' ? parsed.playerStats.xp : 0;
      const computedLevel = calculateLevelInfo(xp).level;

      const completedIds = Array.isArray(parsed.playerStats.completedMissionIds)
        ? parsed.playerStats.completedMissionIds
        : Object.keys(mergedMissions).filter(id => mergedMissions[id].status === 'COMPLETED');

      const sanitizedStats: PlayerStats = {
        ...parsed.playerStats,
        xp,
        coins,
        credits: coins,
        level: computedLevel,
        completedMissionIds: completedIds,
      };

      return {
        missions: mergedMissions,
        activeMissionId: parsed.activeMissionId || null,
        emails: parsed.emails,
        expenses: parsed.expenses,
        files: parsed.files,
        playerStats: sanitizedStats,
      };
    }
  } catch (err) {
    console.warn('[MissionContext] Failed to load localStorage state:', err);
  }

  return {
    missions: INITIAL_MISSIONS,
    activeMissionId: null,
    emails: INITIAL_SAMPLE_EMAILS,
    expenses: INITIAL_SAMPLE_EXPENSES,
    files: INITIAL_SAMPLE_FILES,
    playerStats: INITIAL_PLAYER_STATS,
  };
}

export const MissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [initialData] = useState<MissionPersistencePayload>(loadInitialState);

  const [missions, setMissions] = useState<Record<string, ProductivityMission>>(
    initialData.missions
  );
  const [activeMissionId, setActiveMissionId] = useState<MissionId | null>(
    initialData.activeMissionId
  );
  const [emails, setEmails] = useState<EmailItem[]>(initialData.emails);
  const [expenses, setExpenses] = useState<ExpenseItem[]>(initialData.expenses);
  const [files, setFiles] = useState<FileItem[]>(initialData.files);
  const [playerStats, setPlayerStats] = useState<PlayerStats>(initialData.playerStats);
  const [notification, setNotification] = useState<MissionNotificationData | null>(null);

  // Save to localStorage whenever core state updates
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const payload: MissionPersistencePayload = {
        missions,
        activeMissionId,
        emails,
        expenses,
        files,
        playerStats,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.warn('[MissionContext] Failed to persist state to localStorage:', err);
    }
  }, [missions, activeMissionId, emails, expenses, files, playerStats]);

  const activeMission = useMemo(() => {
    return activeMissionId ? missions[activeMissionId] || null : null;
  }, [activeMissionId, missions]);

  const levelInfo = useMemo(() => {
    return calculateLevelInfo(playerStats.xp);
  }, [playerStats.xp]);

  const spendingSummary = useMemo<SpendingSummary>(() => {
    const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const categorizedSpent = expenses
      .filter(e => e.isCategorized)
      .reduce((acc, curr) => acc + curr.amount, 0);

    const breakdown: Record<ExpenseCategory, { amount: number; count: number }> = {
      Operations: { amount: 0, count: 0 },
      Software: { amount: 0, count: 0 },
      Equipment: { amount: 0, count: 0 },
      Travel: { amount: 0, count: 0 },
      Facilities: { amount: 0, count: 0 },
    };

    for (const exp of expenses) {
      if (exp.assignedCategory && breakdown[exp.assignedCategory]) {
        breakdown[exp.assignedCategory].amount += exp.amount;
        breakdown[exp.assignedCategory].count += 1;
      }
    }

    return {
      totalSpent,
      categorizedSpent,
      breakdown,
    };
  }, [expenses]);

  const dismissNotification = useCallback(() => {
    setNotification(null);
  }, []);

  const acceptMission = useCallback((id: MissionId) => {
    setMissions(prev => {
      const target = prev[id];
      if (!target) return prev;
      return {
        ...prev,
        [id]: {
          ...target,
          status: 'ACTIVE',
        },
      };
    });
    setActiveMissionId(id);
  }, []);

  const declineMission = useCallback((id: MissionId) => {
    setMissions(prev => {
      const target = prev[id];
      if (!target) return prev;
      return {
        ...prev,
        [id]: {
          ...target,
          status: 'AVAILABLE',
        },
      };
    });
    setActiveMissionId(prev => (prev === id ? null : prev));
  }, []);

  const abandonMission = useCallback(
    (id: MissionId) => {
      setMissions(prev => {
        const target = prev[id];
        if (!target) return prev;
        return {
          ...prev,
          [id]: {
            ...target,
            status: 'AVAILABLE',
          },
        };
      });
      if (activeMissionId === id) {
        setActiveMissionId(null);
      }
    },
    [activeMissionId]
  );

  const categorizeEmail = useCallback(
    (emailId: string, category: EmailCategory) => {
      setEmails(prevEmails => {
        const updated = prevEmails.map(m =>
          m.id === emailId
            ? { ...m, assignedCategory: category, isOrganized: true }
            : m
        );
        const organizedCount = updated.filter(m => m.isOrganized).length;

        setMissions(prevMissions => {
          const current = prevMissions['inbox-zero'];
          if (!current) return prevMissions;
          return {
            ...prevMissions,
            'inbox-zero': {
              ...current,
              status: current.status === 'AVAILABLE' ? 'ACTIVE' : current.status,
              currentProgress: organizedCount,
            },
          };
        });

        setActiveMissionId('inbox-zero');
        return updated;
      });
    },
    []
  );

  const categorizeExpense = useCallback((expenseId: string, category: ExpenseCategory) => {
    setExpenses(prevExpenses => {
      const updated = prevExpenses.map(item =>
        item.id === expenseId
          ? { ...item, assignedCategory: category, isCategorized: true }
          : item
      );
      const categorizedCount = updated.filter(item => item.isCategorized).length;

      setMissions(prevMissions => {
        const current = prevMissions['budget-master'];
        if (!current) return prevMissions;
        return {
          ...prevMissions,
          'budget-master': {
            ...current,
            status: current.status === 'AVAILABLE' ? 'ACTIVE' : current.status,
            currentProgress: categorizedCount,
          },
        };
      });

      setActiveMissionId('budget-master');
      return updated;
    });
  }, []);

  const sortFile = useCallback((fileId: string, folder: FileFolder) => {
    setFiles(prevFiles => {
      const updated = prevFiles.map(file =>
        file.id === fileId ? { ...file, assignedFolder: folder, isSorted: true } : file
      );
      const sortedCount = updated.filter(file => file.isSorted).length;

      setMissions(prevMissions => {
        const current = prevMissions['file-organizer'];
        if (!current) return prevMissions;
        return {
          ...prevMissions,
          'file-organizer': {
            ...current,
            status: current.status === 'AVAILABLE' ? 'ACTIVE' : current.status,
            currentProgress: sortedCount,
          },
        };
      });

      setActiveMissionId('file-organizer');
      return updated;
    });
  }, []);

  const completeMission = useCallback(
    (id: MissionId) => {
      const target = missions[id];
      // Prevent duplicate reward if already completed
      if (!target || target.status === 'COMPLETED') return;
      if (playerStats.completedMissionIds?.includes(id)) return;

      const completedTimestamp = new Date().toLocaleTimeString();
      const earnedXp = target.xpReward;
      const earnedCoins = target.coinsReward || target.creditsReward;

      // 1. Update mission state to COMPLETED
      setMissions(prev => ({
        ...prev,
        [id]: {
          ...prev[id],
          status: 'COMPLETED',
          currentProgress: prev[id].totalProgress,
          completedAt: completedTimestamp,
        },
      }));

      // 2. Clear active mission if it was this one
      if (activeMissionId === id) {
        setActiveMissionId(null);
      }

      // 3. Update player stats with XP, Coins, Level, and Completed IDs
      setPlayerStats(prev => {
        if (prev.completedMissionIds?.includes(id)) {
          return prev;
        }

        const newXp = (prev.xp || 0) + earnedXp;
        const newCoins = (prev.coins || 0) + earnedCoins;
        const computedLevelInfo = calculateLevelInfo(newXp);

        const newBadge = {
          id: `badge-${id}-${Date.now()}`,
          name: target.badgeReward,
          category: target.category,
          date: 'Today',
        };

        const updatedCompletedIds = [...(prev.completedMissionIds || []), id];

        return {
          ...prev,
          xp: newXp,
          coins: newCoins,
          credits: newCoins,
          level: computedLevelInfo.level,
          completedMissionsCount: prev.completedMissionsCount + 1,
          badges: [...prev.badges, newBadge],
          completedMissionIds: updatedCompletedIds,
        };
      });

      // 4. Trigger completion notification toast with rewards animation
      const nextXp = (playerStats.xp || 0) + earnedXp;
      const nextLevelInfo = calculateLevelInfo(nextXp);
      const isLevelUp = nextLevelInfo.level > (playerStats.level || 1);

      setNotification({
        id: `notif-${Date.now()}`,
        missionId: id,
        title: target.title,
        xpEarned: earnedXp,
        coinsEarned: earnedCoins,
        creditsEarned: earnedCoins,
        badgeName: target.badgeReward,
        timestamp: completedTimestamp,
        leveledUp: isLevelUp,
        newLevel: nextLevelInfo.level,
      });
    },
    [missions, activeMissionId, playerStats]
  );

  const replayMission = useCallback((id: MissionId) => {
    // 1. Reset the items corresponding to the mission
    if (id === 'inbox-zero') {
      setEmails(INITIAL_SAMPLE_EMAILS);
    } else if (id === 'budget-master') {
      setExpenses(INITIAL_SAMPLE_EXPENSES);
    } else if (id === 'file-organizer') {
      setFiles(INITIAL_SAMPLE_FILES);
    }

    // 2. Reset mission status to AVAILABLE and progress to 0
    setMissions(prev => {
      const current = prev[id];
      if (!current) return prev;
      return {
        ...prev,
        [id]: {
          ...current,
          status: 'AVAILABLE',
          currentProgress: 0,
          completedAt: undefined,
        },
      };
    });

    // 3. Remove from completedMissionIds so player can earn completion reward upon deliberate replay
    setPlayerStats(prev => ({
      ...prev,
      completedMissionIds: (prev.completedMissionIds || []).filter(mId => mId !== id),
    }));

    setActiveMissionId(id);
  }, []);

  const resetDemoMissions = useCallback(() => {
    setMissions(INITIAL_MISSIONS);
    setActiveMissionId(null);
    setEmails(INITIAL_SAMPLE_EMAILS);
    setExpenses(INITIAL_SAMPLE_EXPENSES);
    setFiles(INITIAL_SAMPLE_FILES);
    setPlayerStats(INITIAL_PLAYER_STATS);
    setNotification(null);

    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        console.warn('[MissionContext] Failed to clear localStorage:', err);
      }
    }
  }, []);

  const getMissionForBuilding = useCallback(
    (buildingId: string): ProductivityMission | null => {
      const found = Object.values(missions).find(m => m.buildingId === buildingId);
      return found || null;
    },
    [missions]
  );

  const value = useMemo(
    () => ({
      missions,
      activeMissionId,
      activeMission,
      emails,
      expenses,
      files,
      playerStats,
      levelInfo,
      spendingSummary,
      notification,
      dismissNotification,
      acceptMission,
      declineMission,
      abandonMission,
      categorizeEmail,
      categorizeExpense,
      sortFile,
      completeMission,
      replayMission,
      resetDemoMissions,
      getMissionForBuilding,
    }),
    [
      missions,
      activeMissionId,
      activeMission,
      emails,
      expenses,
      files,
      playerStats,
      levelInfo,
      spendingSummary,
      notification,
      dismissNotification,
      acceptMission,
      declineMission,
      abandonMission,
      categorizeEmail,
      categorizeExpense,
      sortFile,
      completeMission,
      replayMission,
      resetDemoMissions,
      getMissionForBuilding,
    ]
  );

  return <MissionContext.Provider value={value}>{children}</MissionContext.Provider>;
};

export const useMissionSystem = (): MissionContextValue => {
  const context = useContext(MissionContext);
  if (!context) {
    throw new Error('useMissionSystem must be used within a MissionProvider');
  }
  return context;
};
