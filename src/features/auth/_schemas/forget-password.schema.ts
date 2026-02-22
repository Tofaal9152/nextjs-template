import { z } from "zod";
export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .email("please enter a valid email")
    .min(1, "please enter a valid email"),
});
