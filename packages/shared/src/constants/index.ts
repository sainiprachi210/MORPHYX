export const APP_NAME = 'MORPHYX';
export const APP_VERSION = '0.1.0';

export const GAME_ZONES = [
  {
    id: 'NEXUS_PLAZA',
    name: 'Nexus Plaza',
    description: 'Central hub for operatives and dispatch',
  },
  { id: 'CYBER_ARCHIVE', name: 'Cyber Archive', description: 'Deep focus research repository' },
  {
    id: 'QUANTUM_FOUNDRY',
    name: 'Quantum Foundry',
    description: 'High-intensity build and execution zone',
  },
  {
    id: 'ZENITH_ORBIT',
    name: 'Zenith Orbit',
    description: 'High-altitude strategic mission outpost',
  },
] as const;

export const DEFAULT_PLAYER_STATS = {
  focusEnergy: 100,
  stamina: 100,
  productivityStreak: 0,
  totalFocusMinutes: 0,
  tasksCompletedTotal: 0,
} as const;

export const POMODORO_DEFAULTS = {
  FOCUS_MINUTES: 25,
  SHORT_BREAK_MINUTES: 5,
  LONG_BREAK_MINUTES: 15,
} as const;
