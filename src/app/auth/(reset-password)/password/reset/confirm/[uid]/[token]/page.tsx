
import ResetPasswordPage from "@/features/auth/_pages/reset-password/ui/ResetPasswordPage";
import { resetPasswordProps } from "@/features/auth/_types/auth.types";

const page = async ({ params }: resetPasswordProps) => {
  const { uid, token } = await params;
  return <ResetPasswordPage uid={uid} token={token} />;
};

export default page;
