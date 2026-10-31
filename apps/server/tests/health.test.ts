import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { HealthResponseSchema } from '@morphyx/shared';

describe('Server API Endpoints', () => {
  const app = createApp();

  it('GET /api/health should return 200 and a valid health payload', async () => {
    const res = await request(app).get('/api/health');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();

    const parsed = HealthResponseSchema.safeParse(res.body.data);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.status).toBe('healthy');
      expect(parsed.data.service).toContain('MORPHYX');
    }
  });

  it('GET /health root route alias returns 200', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('GET /api/undefined-endpoint should return 404 with structured error', async () => {
    const res = await request(app).get('/api/undefined-endpoint');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBeDefined();
    expect(res.body.error.code).toBe('ROUTE_NOT_FOUND');
  });
});
