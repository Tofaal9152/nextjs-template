"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SubmitButton({
  isLoading = false,
  loadingText = "Submitting...",
  disabled,
  variant = "default",
  children = "Submit",
  ...props
}: {
  isLoading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  children?: React.ReactNode;
} & React.ComponentProps<typeof Button>) {
  return (
    <Button
      type="submit"
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      variant={variant}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingText}
        </span>
      ) : (
        children
      )}
    </Button>
  );
}
