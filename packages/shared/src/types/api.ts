import { z } from 'zod';

export const HealthStatusSchema = z.enum(['healthy', 'degraded', 'unhealthy']);
export type HealthStatus = z.infer<typeof HealthStatusSchema>;

export const HealthResponseSchema = z.object({
  status: HealthStatusSchema,
  service: z.string(),
  version: z.string(),
  timestamp: z.string().datetime(),
  uptime: z.number().min(0),
  environment: z.string(),
  system: z.object({
    nodeVersion: z.string(),
    memoryUsageMB: z.number(),
  }),
});

export type HealthResponse = z.infer<typeof HealthResponseSchema>;

export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    error: z
      .object({
        code: z.string(),
        message: z.string(),
        details: z.any().optional(),
      })
      .optional(),
    meta: z
      .object({
        timestamp: z.string().datetime(),
        requestId: z.string().optional(),
      })
      .optional(),
  });

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    timestamp: string;
    requestId?: string;
  };
}
