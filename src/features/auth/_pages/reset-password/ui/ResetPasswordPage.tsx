import ResetPasswordForm from "./ResetPasswordForm";


const ResetPasswordPage = ({ uid, token }: { uid: string; token: string }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050b16] text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_40%,rgba(17,35,70,0.9),rgba(5,11,22,1))]" />
        <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_30%_30%,rgba(0,229,255,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(35%_35%_at_70%_65%,rgba(0,229,255,0.06),transparent)]" />
      </div>
      <div className="relative z-10 flex min-h-[calc(100vh-120px)] items-center justify-center px-4 pb-14">
        <ResetPasswordForm uid={uid} token={token} />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
