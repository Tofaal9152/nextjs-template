import { env } from "@/lib/env";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

type UseMutationHandlerOptions<TData, TVariables> = {
  mutationFn: (data: TVariables) => Promise<TData>;

  invalidateKeys?: QueryKey[]; //  multiple queries invalidate
  successMessage?: string;
  errorMessage?: string;

  showSuccessToast?: boolean;
  showErrorToast?: boolean;

  onSuccess?: (data: TData) => void;
  onError?: (error: unknown) => void;

  debug?: boolean;
  debugLabel: string;
};

export function useMutationHandler<TData, TVariables>({
  mutationFn,
  invalidateKeys,
  successMessage,
  errorMessage,
  showSuccessToast = true,
  showErrorToast = true,
  onSuccess,
  onError,
  debug = true,
  debugLabel = "Api",
}: UseMutationHandlerOptions<TData, TVariables>) {
  const queryClient = useQueryClient();

  return useMutation<TData, AxiosError<any>, TVariables>({
    mutationFn,

    onSuccess: async (data) => {
      // Debug logging for success
      if (debug && env.isDevelopment) {
        console.group(`✅ [${debugLabel ?? "Mutation"}] Success`);
        console.log("Response:", data);
        console.groupEnd();
      }
      // Invalidate specified queries to refetch fresh data
      if (invalidateKeys?.length) {
        await Promise.all(
          invalidateKeys.map((key) =>
            queryClient.invalidateQueries({ queryKey: key }),
          ),
        );
      }
      // Show success toast if enabled
      if (showSuccessToast && successMessage) {
        toast(successMessage, {
          position: "top-center",
          icon: "✅",
        });
      }
      // Call the onSuccess callback if provided
      onSuccess?.(data);
    },

    onError: (error) => {
      const msg =
        error.response?.data?.message || errorMessage || "Something went wrong";
      // Debug logging for errors
      if (debug && env.isDevelopment) {
        console.group(`❌ [${debugLabel ?? "Mutation"}] Error`);
        console.log("Status:", error.response?.status);
        console.log("Message:", msg);
        console.log("Full error:", error);
        console.groupEnd();
      }
      // Determine error message to show
      if (showErrorToast) {
        toast.error(msg, {
          position: "top-center",
          icon: "❌",
        });
      }
      // Call the onError callback if provided
      onError?.(error);
    },
  });
}
