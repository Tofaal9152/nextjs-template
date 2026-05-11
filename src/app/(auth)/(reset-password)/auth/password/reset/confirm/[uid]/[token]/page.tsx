import ResetPasswordIndex from "@/features/auth/pages/reset-password/components";
import { resetPasswordProps } from "@/features/auth/types/auth.types";

const page = async ({ params }: resetPasswordProps) => {
  const { uid, token } = await params;
  return <ResetPasswordIndex uid={uid} token={token} />;
};

export default page;
