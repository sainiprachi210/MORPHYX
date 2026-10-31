import { z } from 'zod';

export const MissionDifficultySchema = z.enum(['RECON', 'TACTICAL', 'OPERATIONAL', 'ELITE']);
export type MissionDifficulty = z.infer<typeof MissionDifficultySchema>;

export const MissionSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(3).max(100),
  description: z.string().min(5).max(1000),
  difficulty: MissionDifficultySchema.default('TACTICAL'),
  xpReward: z.number().int().min(10),
  creditReward: z.number().int().min(0),
  category: z.enum(['CODING', 'LEARNING', 'HEALTH', 'FOCUS', 'CREATIVE']).default('FOCUS'),
  createdAt: z.string().datetime().optional(),
});

export type Mission = z.infer<typeof MissionSchema>;

export const TaskPrioritySchema = z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);
export type TaskPriority = z.infer<typeof TaskPrioritySchema>;

export const TaskStatusSchema = z.enum(['TODO', 'IN_PROGRESS', 'BLOCKED', 'COMPLETED']);
export type TaskStatus = z.infer<typeof TaskStatusSchema>;

export const TaskJobSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  missionId: z.string().uuid().nullable().optional(),
  title: z.string().min(1).max(120),
  description: z.string().max(2000).optional(),
  status: TaskStatusSchema.default('TODO'),
  priority: TaskPrioritySchema.default('MEDIUM'),
  estimatedMinutes: z.number().int().min(1).max(720).default(25),
  pomodoroSessions: z.number().int().min(0).default(0),
  dueDate: z.string().datetime().nullable().optional(),
  completedAt: z.string().datetime().nullable().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export type TaskJob = z.infer<typeof TaskJobSchema>;

export const CreateTaskJobSchema = TaskJobSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  completedAt: true,
});

export type CreateTaskJobInput = z.infer<typeof CreateTaskJobSchema>;
