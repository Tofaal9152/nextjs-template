"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { SignInAction } from "../services/signIn.action";



export default function SignInForm() {
  const router = useRouter();

  const [state, action, isPending] = useActionState(SignInAction, {
    errors: {},
  });

  useEffect(() => {
    if (state?.success && !isPending) {
      router.refresh();
      toast.success("Login successful!");
    }
  }, [state, isPending, router]);

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <Input
          name="email"
          type="email"
          required
          placeholder="Enter your email"
        />
        {state?.errors?.email && (
          <p className="text-xs text-red-500">{state.errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Password</label>
        <Input
          name="password"
          type="password"
          required
          placeholder="Enter your password"
        />
        {state?.errors?.password && (
          <p className="text-xs text-red-500">{state.errors.password}</p>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending && <Spinner className="mr-2" />}
        Login
      </Button>

      {state?.errors?.formError && (
        <p className="text-sm text-red-500">{state.errors.formError}</p>
      )}
    </form>
  );
}
