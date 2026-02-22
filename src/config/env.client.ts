import { z } from "zod";

const clientSchema = z.object({
  NEXT_PUBLIC_BACKEND_URL: z.string().url(),
  
});

const parsed = clientSchema.safeParse({
  NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

if (!parsed.success) {
  console.error("Invalid client env vars:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid client environment variables");
}

export const env = parsed.data;


