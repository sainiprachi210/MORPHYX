import { z } from 'zod';
import dotenv from 'dotenv';

// Load .env file if available
dotenv.config();

const ServerEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z
    .string()
    .transform(val => parseInt(val, 10))
    .pipe(z.number().min(1000).max(65535))
    .default('4000'),
  HOST: z.string().default('0.0.0.0'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  SUPABASE_URL: z.string().url().optional().or(z.literal('')),
  SUPABASE_ANON_KEY: z.string().optional().or(z.literal('')),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional().or(z.literal('')),
});

const parseEnv = () => {
  const result = ServerEnvSchema.safeParse(process.env);
  if (!result.success) {
    const errorIssues = result.error.issues
      .map(issue => `  - ${issue.path.join('.')}: ${issue.message}`)
      .join('\n');
    console.error(`[FATAL] Invalid server environment variables:\n${errorIssues}`);
    throw new Error('Server environment validation failed');
  }
  return result.data;
};

export const env = parseEnv();
export type ServerEnv = z.infer<typeof ServerEnvSchema>;
