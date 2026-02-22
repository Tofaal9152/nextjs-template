import { useMutationHandler } from "@/hooks/useMutationHandler";
import { request } from "@/utils/request";
import z from "zod";

export const TrainerAtHomeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone_number: z.string().min(11, "Phone number must be at least 11 digits"),
  address: z.string().min(1, "Address is required"),
  time: z.string().min(1, "Preferred time is required"),
  gender: z.enum(["Male", "Female"], {
    message: "Trainer gender is required",
  }),
});

type TrainerAtHomeData = z.infer<typeof TrainerAtHomeSchema>;

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
