"use server";
import { validateForm } from "@/utils/validateForm";
import axios from "axios";
import { LoginSchema } from "../schemas/sign-in.schema";

import { env } from "@/lib/env";
import { CreateSession } from "@/lib/session";
import HandleError from "@/utils/errorHandle";
import { LoginType } from "@/features/auth/_types/auth.types";

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
