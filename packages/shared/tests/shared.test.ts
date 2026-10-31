import { describe, it, expect } from 'vitest';
import {
  UserProfileSchema,
  TaskJobSchema,
  MultiplayerRoomSchema,
  HealthResponseSchema,
  APP_NAME,
} from '../src/index.js';

describe('@morphyx/shared contracts', () => {
  it('validates a correct user profile schema', () => {
    const validProfile = {
      id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      displayName: 'CypherOperative',
      level: 5,
      xp: 2400,
      credits: 150,
    };

    const parsed = UserProfileSchema.safeParse(validProfile);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.displayName).toBe('CypherOperative');
      expect(parsed.data.level).toBe(5);
    }
  });

  it('rejects an invalid task job priority', () => {
    const invalidTask = {
      id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      userId: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
      title: 'Build Neural Interface',
      priority: 'ULTRA_HIGH', // invalid priority
    };

    const parsed = TaskJobSchema.safeParse(invalidTask);
    expect(parsed.success).toBe(false);
  });

  it('validates a multiplayer room schema default values', () => {
    const roomInput = {
      id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      roomCode: 'NX-4091',
      name: 'Alpha Squad Hub',
      hostId: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    };

    const parsed = MultiplayerRoomSchema.safeParse(roomInput);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.status).toBe('OPEN');
      expect(parsed.data.maxPlayers).toBe(8);
      expect(parsed.data.worldSeed).toBe('GENESIS_ALPHA');
    }
  });

  it('validates health response schema', () => {
    const healthPayload = {
      status: 'healthy',
      service: APP_NAME,
      version: '0.1.0',
      timestamp: new Date().toISOString(),
      uptime: 120.4,
      environment: 'test',
      system: {
        nodeVersion: process.version,
        memoryUsageMB: 48,
      },
    };

    const parsed = HealthResponseSchema.safeParse(healthPayload);
    expect(parsed.success).toBe(true);
  });
});
