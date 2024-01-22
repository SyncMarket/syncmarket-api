import 'dotenv/config';
import z from 'zod';

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    PORT: z.string().default('3000'),
});

export const ENV = envSchema.parse(process.env);
