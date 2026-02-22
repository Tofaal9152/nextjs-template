import { Role } from "@/types/rbac.type";

export type LoginType = {
  success?: boolean;
  status?: string;
  accessToken?: string;
  errors: {
    email?: string[];
    password?: string[];
    formError?: string[];
  };
};

export type Session = {
  user: {
    id: string;
    name: string;
    email: string;
    role: Role;
  };
  accessToken: string;
  refreshToken: string;
};

export type EmailSendType = {
  errors: {
    email?: string[];
    formError?: string[];
  };
  success_text?: string;
  success?: boolean;
};
export type ResetPasswordType = {
  errors: {
    new_password1?: string[];
    new_password2?: string[];
    uid?: string[];
    token?: string[];
    formError?: string[];
  };
  success?: boolean;
};

export type resetPasswordProps = {
  params: {
    uid: string;
    token: string;
  };
};
