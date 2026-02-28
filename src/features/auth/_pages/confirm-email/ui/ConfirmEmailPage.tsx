"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import unAuthorizedApiClient from "@/lib/http/publicApiClient";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function ConfirmEmailPage({ token }: { token: string }) {
  const router = useRouter();

  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState<string>("Confirming your email...");
  const [countdown, setCountdown] = useState<number>(5);

  useEffect(() => {
    if (!token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus("error");
      setMessage("No confirmation token provided");
      return;
    }

    const decodedToken = decodeURIComponent(token);

    (async () => {
      try {
        const res = await unAuthorizedApiClient.post(
          "/rest-auth/registration/account-confirm-email/",
          { key: decodedToken }
        );

        setStatus("success");
        setMessage(
          res?.data?.detail ||
            "Your email has been successfully confirmed! You can now sign in."
        );
      } catch (err: any) {
        setStatus("error");
        const errorMsg =
          err?.response?.data?.detail ||
          err?.response?.data?.message ||
          err?.response?.data?.non_field_errors?.[0] ||
          "Email confirmation failed. The link may be invalid or expired.";
        setMessage(errorMsg);
      }
    })();
  }, [token]);

  // Auto-redirect countdown on success
  useEffect(() => {
    if (status === "success" && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    if (status === "success" && countdown === 0) {
      router.push("/auth/signin");
    }
  }, [status, countdown, router]);

  // Loading state
  if (status === "loading") {
    return (
      <div className="relative min-h-screen bg-[#050b16] text-white flex items-center justify-center px-4 overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_40%,rgba(17,35,70,0.9),rgba(5,11,22,1))]" />
          <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_30%_30%,rgba(0,229,255,0.08),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(35%_35%_at_70%_65%,rgba(0,229,255,0.06),transparent)]" />
        </div>

        <div className="relative z-10 text-center space-y-6">
          <div className="flex justify-center">
            <Loader2 className="h-20 w-20 animate-spin text-cyan-400" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Confirming Your Email
            </h2>
            <p className="text-gray-400">
              Please wait while we verify your email address...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (status === "success") {
    return (
      <div className="relative min-h-screen bg-[#050b16] text-white flex items-center justify-center px-4 overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_40%,rgba(17,35,70,0.9),rgba(5,11,22,1))]" />
          <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_30%_30%,rgba(0,229,255,0.08),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(35%_35%_at_70%_65%,rgba(0,229,255,0.06),transparent)]" />
        </div>

        <div className="relative z-10 max-w-md w-full text-center space-y-8">
          <div className="flex justify-center">
            <div className="relative">
              <CheckCircle2 className="h-24 w-24 text-cyan-400 animate-in zoom-in duration-300" />
              <div className="absolute inset-0 animate-ping">
                <CheckCircle2 className="h-24 w-24 text-cyan-400 opacity-20" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Email Confirmed!
            </h1>
            <p className="text-gray-300">{message}</p>
          </div>

          <div className="rounded-[22px] border border-cyan-400/25 bg-[#071226]/70 p-6 space-y-4 backdrop-blur">
            <p className="text-sm text-gray-400">
              Redirecting to sign in in{" "}
              <span className="text-cyan-400 font-bold text-lg">
                {countdown}
              </span>{" "}
              seconds...
            </p>
            <Button
              onClick={() => router.push("/auth/signin")}
              className="w-full bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0"
              size="lg"
            >
              Go to Sign In Now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  return (
    <div className="relative min-h-screen bg-[#050b16] text-white flex items-center justify-center px-4 overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_40%,rgba(17,35,70,0.9),rgba(5,11,22,1))]" />
        <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_30%_30%,rgba(0,229,255,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(35%_35%_at_70%_65%,rgba(0,229,255,0.06),transparent)]" />
      </div>

      <div className="relative z-10 max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <XCircle className="h-24 w-24 text-red-400 animate-in zoom-in duration-300" />
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-red-400">
            Confirmation Failed
          </h1>
          <p className="text-gray-300">{message}</p>
        </div>

        <div className="space-y-4">
          <div className="rounded-[22px] border border-cyan-400/25 bg-[#071226]/70 p-6 text-left space-y-3 backdrop-blur">
            <p className="font-medium text-cyan-400">Possible reasons:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-400 text-sm">
              <li>The confirmation link has expired</li>
              <li>The link has already been used</li>
              <li>The link is invalid or corrupted</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => router.push("/")}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0"
            >
              Got to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
