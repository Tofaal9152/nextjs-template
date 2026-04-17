"use server";
import { ResetPasswordSchema } from "@/features/auth/_pages/reset-password/schemas/reset-password.schema";
import { ResetPasswordType } from "@/features/auth/_types/auth.types";
import HandleError from "@/utils/errorHandle";
import { validateForm } from "@/utils/validateForm";
import { env } from "@/lib/env";
import axios from "axios";

export const ResetPasswordAction = async (
  previousState: ResetPasswordType,
  formData: FormData
): Promise<ResetPasswordType> => {
  const validationErrors = validateForm(ResetPasswordSchema, formData);

  if (validationErrors) {
    return validationErrors;
  }

  try {
    const payload: any = {
      new_password1: formData.get("new_password1"),
      new_password2: formData.get("new_password2"),
      uid: formData.get("uid"),
      token: formData.get("token"),
    };

    await axios.post(
      `${env.BACKEND_URL}/rest-auth/password/reset/confirm/`,
      payload,
      {
        withCredentials: true,
      }
    );

    return {
      success: true,
      errors: {},
    };
  } catch (error) {
    return HandleError(error);
  }
};
