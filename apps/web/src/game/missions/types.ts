export type MissionId = 'inbox-zero' | 'budget-master' | 'file-organizer';

export type MissionStatus = 'AVAILABLE' | 'ACTIVE' | 'COMPLETED';

export type MissionCategory = 'COMMUNICATIONS' | 'FINANCE' | 'TECHNOLOGY';

export type MissionDifficulty = 'RECON' | 'TACTICAL' | 'OPERATIONAL';

export type EmailCategory = 'Work' | 'Personal' | 'Important';

export interface EmailItem {
  id: string;
  sender: string;
  subject: string;
  snippet: string;
  time: string;
  assignedCategory: EmailCategory | null;
  isOrganized: boolean;
}

export type ExpenseCategory =
  | 'Operations'
  | 'Software'
  | 'Equipment'
  | 'Travel'
  | 'Facilities';

export interface ExpenseItem {
  id: string;
  merchant: string;
  description: string;
  amount: number;
  date: string;
  assignedCategory: ExpenseCategory | null;
  isCategorized: boolean;
}

export type FileFolder =
  | '/src'
  | '/docs'
  | '/assets'
  | '/tests'
  | '/config';

export interface FileItem {
  id: string;
  name: string;
  extension: string;
  sizeKb: number;
  fileType: 'code' | 'doc' | 'image' | 'test' | 'config';
  correctFolder: FileFolder;
  assignedFolder: FileFolder | null;
  isSorted: boolean;
}

export interface LevelInfo {
  level: number;
  currentLevelXp: number;
  nextLevelXp: number;
  progressPercent: number;
  xpToNextLevel: number;
  baseXp: number;
  targetXp: number;
}

export interface ProductivityMission {
  id: MissionId;
  buildingId: string;
  buildingName: string;
  title: string;
  subtitle: string;
  description: string;
  category: MissionCategory;
  difficulty: MissionDifficulty;
  xpReward: number;
  coinsReward: number;
  creditsReward: number;
  badgeReward: string;
  objectiveSummary: string;
  status: MissionStatus;
  currentProgress: number;
  totalProgress: number; // 5
  completedAt?: string;
}

export interface PlayerBadge {
  id: string;
  name: string;
  category: string;
  date: string;
}

export interface PlayerStats {
  xp: number;
  coins: number;
  credits: number;
  level: number;
  completedMissionsCount: number;
  badges: PlayerBadge[];
  completedMissionIds?: string[];
}

export interface MissionNotificationData {
  id: string;
  missionId: MissionId;
  title: string;
  xpEarned: number;
  coinsEarned: number;
  creditsEarned: number;
  badgeName: string;
  timestamp: string;
  leveledUp?: boolean;
  newLevel?: number;
}

export interface MissionPersistencePayload {
  missions: Record<string, ProductivityMission>;
  activeMissionId: MissionId | null;
  emails: EmailItem[];
  expenses: ExpenseItem[];
  files: FileItem[];
  playerStats: PlayerStats;
}

