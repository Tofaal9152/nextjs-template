import { z } from "zod";
export const ResetPasswordSchema = z
  .object({
    new_password1: z.string().min(6, "Password must be at least 6 characters"),
    new_password2: z.string().min(6, "Please confirm your password"),
    uid: z.string().min(1, "User ID is required"),
    token: z.string().min(1, "Token is required"),
  })
  .refine((data) => data.new_password1 === data.new_password2, {});
