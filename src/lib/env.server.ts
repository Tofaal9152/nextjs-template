import { z } from "zod";

const serverSchema = z.object({
  BACKEND_URL: z.string().url(),
  SESSION_SECRET_KEY: z.string().min(32),
  SESSION_COOKIE_NAME: z.string().optional(),
  SESSION_MAX_AGE_DAYS: z.any().optional(),
});

const parsed = serverSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid server env vars:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid server environment variables");
}

export const env = parsed.data;
