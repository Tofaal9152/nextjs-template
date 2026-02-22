"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getErrorMessage } from "@/utils/getErrorMessage";

export function FormStatusAlert({
  isError,
  error,
  isSuccess,
  successTitle = "Success!",
  successMessage = "Saved successfully.",
  errorTitle = "Submission failed",
}: {
  isError: boolean;
  error: unknown;
  isSuccess: boolean;
  successTitle?: string;
  successMessage?: string;
  errorTitle?: string;
}) {
  if (isError) {
    return (
      <Alert variant="destructive" className="w-full mt-4">
        <AlertTitle>{errorTitle}</AlertTitle>
        <AlertDescription>{getErrorMessage(error)}</AlertDescription>
      </Alert>
    );
  }

  if (isSuccess) {
    return (
      <Alert variant="success" className="w-full mt-4">
        <AlertTitle>{successTitle}</AlertTitle>
        <AlertDescription>{successMessage}</AlertDescription>
      </Alert>
    );
  }

  return null;
}