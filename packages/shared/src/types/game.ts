import { z } from 'zod';

export const Coordinates3DSchema = z.object({
  x: z.number().default(0),
  y: z.number().default(0),
  z: z.number().default(0),
  rotationY: z.number().default(0),
});

export type Coordinates3D = z.infer<typeof Coordinates3DSchema>;

export const PlayerStatsSchema = z.object({
  focusEnergy: z.number().min(0).max(100).default(100),
  stamina: z.number().min(0).max(100).default(100),
  productivityStreak: z.number().int().min(0).default(0),
  totalFocusMinutes: z.number().int().min(0).default(0),
  tasksCompletedTotal: z.number().int().min(0).default(0),
});

export type PlayerStats = z.infer<typeof PlayerStatsSchema>;

export const InventoryItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['COSMETIC', 'BOOSTER', 'RELIC', 'BADGE']),
  rarity: z.enum(['COMMON', 'RARE', 'EPIC', 'LEGENDARY']),
  quantity: z.number().int().min(1).default(1),
  equipped: z.boolean().default(false),
});

export type InventoryItem = z.infer<typeof InventoryItemSchema>;

export const GameProgressSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  currentZone: z.string().default('NEXUS_PLAZA'),
  position: Coordinates3DSchema.default({ x: 0, y: 0, z: 0, rotationY: 0 }),
  stats: PlayerStatsSchema.default({
    focusEnergy: 100,
    stamina: 100,
    productivityStreak: 0,
    totalFocusMinutes: 0,
    tasksCompletedTotal: 0,
  }),
  inventory: z.array(InventoryItemSchema).default([]),
  updatedAt: z.string().datetime().optional(),
});

export type GameProgress = z.infer<typeof GameProgressSchema>;
