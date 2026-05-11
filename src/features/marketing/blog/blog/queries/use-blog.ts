import { useMutationHandler } from "@/hooks/use-mutation-handler";
import { request } from "@/lib/http/request";
export interface BlogData {
  title: string;
  content: string;
}
export function useCreateBlogMutation() {
  return useMutationHandler({
    mutationFn: (data: BlogData) => {
      return request.post("/blogs/", data);
    },
    successMessage: "Blog created successfully!",
    showErrorToast: true,
    debugLabel: "Create Blog",
  });
}
export function useUpdateBlogMutation() {
  return useMutationHandler({
    mutationFn: (data: BlogData) => {
      return request.put("/blogs/", data);
    },
    successMessage: "Blog updated successfully!",
    showErrorToast: true,
    debugLabel: "Update Blog",
  });
}
