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

export type TrainerAtHomeData = z.infer<typeof TrainerAtHomeSchema>;
