import 'dotenv/config';
import z from 'zod';

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    PORT: z.string().default('3000'),
    AUTH0_BASE_URL: z.string().url(),
    AUTH0_AUDIENCE: z.string(),
    AUTH0_CONNECTION: z.string(),
    AUTH0_CLIENT_ID: z.string(),
    AUTH0_CLIENT_SECRET: z.string(),
});

export const ENV = envSchema.parse(process.env);
