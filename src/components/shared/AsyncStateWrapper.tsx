import { Loader } from "lucide-react";
import React from "react";

interface AsyncStateWrapperProps {
  loading: boolean;
  error?: string | null;
  children: React.ReactNode;
  spinnerSize?: number;
  errorFallback?: React.ReactNode;
  loaderFallback?: React.ReactNode;
}

const AsyncStateWrapper: React.FC<AsyncStateWrapperProps> = ({
  loading,
  error,
  children,
  spinnerSize = 24,
  errorFallback,
  loaderFallback,
}) => {
  if (loading) {
    return (
      loaderFallback ?? (
        <div className="flex items-center justify-center p-4">
          <Loader
            className="animate-spin text-muted-foreground"
            style={{ width: spinnerSize, height: spinnerSize }}
          />
        </div>
      )
    );
  }

  if (error) {
    return (
      errorFallback ?? (
        <div className="text-red-500 text-center min-h-24 p-4">
          Error: {error}
        </div>
      )
    );
  }

  return <>{children}</>;
};

export default AsyncStateWrapper;
