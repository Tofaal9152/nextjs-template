"use server";
import { validateForm } from "@/utils/validateForm";
import axios from "axios";
import { LoginSchema } from "../_schemas/sign-in.schema";
import { LoginType } from "../_types/auth.types";

import { env } from "@/config/env.server";
import { CreateSession } from "@/features/auth/_services/session";
import HandleError from "@/utils/errorHandle";

export const SignInAction = async (
  previousState: LoginType,
  formData: FormData,
): Promise<LoginType> => {
  const validationErrors = validateForm(LoginSchema, formData);

  if (validationErrors) {
    return validationErrors;
  }

  try {
    const base = env.BACKEND_URL;
    const { data } = await axios.post(
      `${base}/rest-auth/login/`,
      {
        email: formData.get("email"),
        password: formData.get("password"),
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    await CreateSession({
      user: {
        id: String(data?.user?.pk),
        name: data?.user?.username ?? "",
        email: data?.user?.email ?? "",
        role: data?.role,
      },
      accessToken: data?.access,
      refreshToken: data?.refresh,
    });

    return { success: true, errors: {} };
  } catch (error) {
    return HandleError(error);
  }
};
