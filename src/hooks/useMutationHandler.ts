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
}: UseMutationHandlerOptions<TData, TVariables>) {
  const queryClient = useQueryClient();

  return useMutation<TData, AxiosError<any>, TVariables>({
    mutationFn,

    onSuccess: async (data) => {
      //  invalidate multiple queries
      if (invalidateKeys?.length) {
        await Promise.all(
          invalidateKeys.map((key) =>
            queryClient.invalidateQueries({ queryKey: key }),
          ),
        );
      }

      if (showSuccessToast && successMessage) {
        toast(successMessage, {
          position: "top-center",
          icon: "✅",
        });
      }

      onSuccess?.(data);
    },

    onError: (error) => {
      const msg =
        error.response?.data?.message || errorMessage || "Something went wrong";

      console.error("Mutation error:", msg);

      if (showErrorToast) {
        toast.error(msg, {
          position: "top-center",
          icon: "❌",
        });
      }

      onError?.(error);
    },
  });
}
