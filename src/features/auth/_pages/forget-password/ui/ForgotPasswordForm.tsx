"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

import { ForgotPasswordAction } from "@/features/auth/_pages/forget-password/services/forget-password.action";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const ForgotPasswordForm = () => {
  const [state, action, isPending] = useActionState(ForgotPasswordAction, {
    success: false,
    errors: {},
  });

  useEffect(() => {
    console.log(state);
    if (state.success === true) {
      toast.success(state.success_text);
    }
  }, [state]);

  return (
    <form action={action}>
      <div
        style={{
          boxShadow: "0px 0px 28px 0px rgba(46,46,255,0.9)",
        }}
        className="max-w-md w-full border p-8 rounded-lg shadow-md text-center"
      >
        <h2 className="text-2xl font-bold bg-linear-to-r from-blue-800 to-blue-500 text-transparent bg-clip-text mb-2">
          Reset Password
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Enter your email address to receive a password reset link.
        </p>
        <Input type="email" required name="email" placeholder="Email Address" />

        {state.errors.email && (
          <div className="bg-red-100 text-red-500 p-2 rounded-lg my-2">
            {state.errors.email}
          </div>
        )}
        <Button type="submit" disabled={isPending} className="w-full mt-4">
          {isPending && <Spinner className="mr-2 h-4 w-4" />} Send Reset Link
        </Button>

        {state.errors.formError && (
          <div className="bg-red-100 text-red-500 p-2 rounded-lg my-2">
            {`${state.errors.formError} `}{" "}
          </div>
        )}
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
