import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z.string().default('development'),
    PORT: z.string().default('3000'),
    DATABASE_URL: z.string().url(),
});

export const ENV = envSchema.parse(process.env);
