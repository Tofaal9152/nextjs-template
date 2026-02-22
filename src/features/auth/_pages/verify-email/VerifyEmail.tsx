import { Button } from "@/components/ui/button";
import { MailCheck } from "lucide-react";
import Link from "next/link";

const VerifyEmail = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-sm">
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <MailCheck className="h-7 w-7 text-primary" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold">Check your email</h1>

        {/* Description */}
        <p className="mt-3 text-sm text-muted-foreground">
          We’ve sent a verification link to your email address. Please open your
          inbox and click the link to verify your account.
        </p>

        {/* Actions */}
        <div className="mt-6 space-y-3">
          <Button className="w-full" asChild>
            <Link href="/auth/signin">Go to Login</Link>
          </Button>

          <p className="text-xs text-muted-foreground">
            Didn’t receive the email? Check your spam folder or try again.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
