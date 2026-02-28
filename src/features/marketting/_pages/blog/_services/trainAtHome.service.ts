import { useMutationHandler } from "@/hooks/useMutationHandler";
import { request } from "@/lib/http/request";
import { TrainerAtHomeData } from "../_schemas/trainAtHome.schema";

export function useTrainerAtHomeMutation() {
  return useMutationHandler({
    mutationFn: (data: TrainerAtHomeData) => {
      return request.post("/active/in-house-session-request/", {
        name: data.name,
        phone_number: data.phone_number,
        address: data.address,
        gender: data.gender,
      });
    },
    successMessage: "Submitted successfully!",
    showErrorToast: true,
  });
}
