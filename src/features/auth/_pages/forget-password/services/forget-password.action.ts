"use server";


import { EmailSendType } from "@/features/auth/_types/auth.types";
import HandleError from "@/utils/errorHandle";
import { validateForm } from "@/utils/validateForm";
import axios from "axios";
import { ForgotPasswordSchema } from "../schemas/forget-password.schema";
import { env } from "@/lib/env";

export const ForgotPasswordAction = async (
  previousState: EmailSendType,
  formData: FormData
): Promise<EmailSendType> => {
  const validationErrors = validateForm(ForgotPasswordSchema, formData);

  if (validationErrors) {
    return validationErrors;
  }

  try {
    const payload: any = {
      email: formData.get("email"),
    };
    const res = await axios.post(
      `${env.BACKEND_URL}/rest-auth/password/reset/`,
      payload,
      { withCredentials: true }
    );
    console.log(res.data, "---------");
    return {
      success: true,
      success_text: res.data.detail,
      errors: {},
    };
  } catch (error) {
    console.log(error);
    return HandleError(error);
  }
};
