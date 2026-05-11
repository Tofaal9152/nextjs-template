import ConfirmEmailPage from "@/features/auth/pages/confirm-email";

const page = async ({ params }: { params: { token: string } }) => {
  const { token } = await params;

  return <ConfirmEmailPage token={token} />;
};

export default page;
