import { z } from 'zod';

export const RoomStatusSchema = z.enum(['OPEN', 'IN_MISSION', 'CLOSED', 'ARCHIVED']);
export type RoomStatus = z.infer<typeof RoomStatusSchema>;

export const MultiplayerRoomSchema = z.object({
  id: z.string().uuid(),
  roomCode: z.string().min(4).max(12),
  name: z.string().min(3).max(64),
  description: z.string().max(250).optional(),
  hostId: z.string().uuid(),
  worldSeed: z.string().default('GENESIS_ALPHA'),
  maxPlayers: z.number().int().min(2).max(16).default(8),
  activePlayersCount: z.number().int().min(0).default(1),
  status: RoomStatusSchema.default('OPEN'),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export type MultiplayerRoom = z.infer<typeof MultiplayerRoomSchema>;

export const RoomParticipantSchema = z.object({
  roomId: z.string().uuid(),
  userId: z.string().uuid(),
  role: z.enum(['HOST', 'OFFICER', 'OPERATOR']).default('OPERATOR'),
  joinedAt: z.string().datetime().optional(),
  lastPingAt: z.string().datetime().optional(),
});

export type RoomParticipant = z.infer<typeof RoomParticipantSchema>;
