import { z } from 'zod';

export const UserProfileSchema = z.object({
  id: z.string().uuid(),
  displayName: z.string().min(2).max(32),
  avatarUrl: z.string().url().nullable().optional(),
  level: z.number().int().min(1).default(1),
  xp: z.number().int().min(0).default(0),
  credits: z.number().int().min(0).default(0),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;

export const UpdateProfileSchema = z.object({
  displayName: z.string().min(2).max(32).optional(),
  avatarUrl: z.string().url().nullable().optional(),
});

export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;
