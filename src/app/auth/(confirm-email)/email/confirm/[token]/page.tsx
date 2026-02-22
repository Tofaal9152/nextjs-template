import ConfirmEmailPage from "@/features/auth/_pages/confirm-email/ConfirmEmailPage";

const page = async ({ params }: { params: { token: string } }) => {
  const { token } = await params;

  return <ConfirmEmailPage token={token} />;
};

export default page;
