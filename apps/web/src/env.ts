import { z } from 'zod';

const WebEnvSchema = z.object({
  VITE_API_URL: z.string().url().default('http://localhost:4000'),
  VITE_SUPABASE_URL: z.string().url().optional().or(z.literal('')),
  VITE_SUPABASE_ANON_KEY: z.string().optional().or(z.literal('')),
});

const parseWebEnv = () => {
  const result = WebEnvSchema.safeParse({
    VITE_API_URL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || '',
    VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  });

  if (!result.success) {
    console.warn('Web environment variable validation warnings:', result.error.format());
    return {
      VITE_API_URL: 'http://localhost:4000',
      VITE_SUPABASE_URL: '',
      VITE_SUPABASE_ANON_KEY: '',
    };
  }

  return result.data;
};

export const webEnv = parseWebEnv();
