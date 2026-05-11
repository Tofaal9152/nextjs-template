import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .email("please enter a valid email")
    .min(1, "please enter a valid email"),
  password: z.string().min(1, "please enter a valid password"),
});
