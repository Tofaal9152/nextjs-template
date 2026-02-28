"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ResetPasswordAction } from "@/features/auth/_pages/reset-password/services/reset-password.action";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const ResetPasswordForm = ({ uid, token }: any) => {
  const router = useRouter();

  const [state, action, isPending] = useActionState(ResetPasswordAction, {
    success: false,
    errors: {},
  });

  useEffect(() => {
    if (state.success === true) {
      toast.success("Password reset successfully");
      router.push("/auth/signin");
    }
  }, [state, router]);

  return (
    <form action={action}>
      <div
        style={{
          boxShadow: "0px 0px 28px 0px rgba(46,46,255,0.9)",
        }}
        className="max-w-md w-full border p-8 rounded-lg shadow-md text-center"
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-blue-500 text-transparent bg-clip-text mb-2">
          Reset Your Password
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Enter your new password below. Make sure it meets the security
          requirements.
        </p>
        <div className="flex flex-col gap-4">
          <Input
            type="password"
            required
            name="new_password1"
            placeholder="Enter your new password"
          />
          {state.errors.new_password1 && (
            <div className="bg-red-100 text-red-500 p-2 rounded-lg my-2">
              {state.errors.new_password1}
            </div>
          )}
          <Input
            type="password"
            required
            name="new_password2"
            placeholder="Confirm your new password"
          />
          {state.errors.new_password2 && (
            <div className="bg-red-100 text-red-500 p-2 rounded-lg my-2">
              {state.errors.new_password2}
            </div>
          )}
        </div>
        <Input type="text" required name="uid" hidden defaultValue={uid} />
        <Input type="text" required name="token" hidden defaultValue={token} />

        <Button type="submit" disabled={isPending} className="w-full mt-4">
          {isPending && <Loader className="mr-2 animate-spin" size={18} />}
          Reset Password
        </Button>
        {state.errors.formError && (
          <div className="bg-red-100 text-red-500 p-2 rounded-lg my-2">
            {state.errors.formError}
          </div>
        )}
      </div>
    </form>
  );
};

export default ResetPasswordForm;
