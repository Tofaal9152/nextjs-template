"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FormFieldWrapper } from "@/components/shared/form-related/FormFieldWrapper";
import { SubmitButton } from "@/components/shared/form-related/SubmitButton";
import { SubmitErrorSummary } from "@/components/shared/form-related/SubmitErrorSummary";
import { useZodTanstackForm } from "@/hooks/useZodTanstackForm";
import { TrainerAtHomeSchema } from "../_schemas/trainAtHome.schema";
import { useTrainerAtHomeMutation } from "../_services/trainAtHome.service";

export default function TrainAtHomeForm() {
  // export default function TrainAtHomeForm() {
  const mutation = useTrainerAtHomeMutation();
  const { form, resetAll, submitErrors } = useZodTanstackForm({
    defaultValues: {
      name: "",
      phone_number: "",
      address: "",
      time: "",
      gender: "Male",
    },
    schema: TrainerAtHomeSchema,
    mutation,

    // ✅ optional field label map
    fieldLabels: {
      name: "Name",
      phone_number: "Phone Number",
      address: "Training Address",
      time: "Time",
      gender: "Trainer Gender",
    },
  });

  return (
    <div className="min-h-screen bg-white-100 md:py-10 py-4 md:px-4 z-10 relative">
      <form
        id="train-at-home"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="max-w-3xl mx-auto space-y-6"
      >
        <FieldGroup>
          <Card>
            <CardHeader>
              <CardTitle>Train at Home Session Request</CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              {/* 1. Name */}
              <form.Field name="name">
                {(field) => (
                  <FormFieldWrapper<string> field={field} label="Name *">
                    {(p) => (
                      <Input
                        {...p.inputProps}
                        placeholder="Full name"
                        autoComplete="name"
                      />
                    )}
                  </FormFieldWrapper>
                )}
              </form.Field>

              {/* 2. Phone */}
              <form.Field name="phone_number">
                {(field) => (
                  <FormFieldWrapper<string>
                    field={field}
                    label="Phone Number *"
                  >
                    {(p) => (
                      <Input
                        {...p.inputProps}
                        placeholder="Enter phone number"
                        autoComplete="tel"
                      />
                    )}
                  </FormFieldWrapper>
                )}
              </form.Field>

              {/* 3. Address (Training Address) */}
              <form.Field name="address">
                {(field) => (
                  <FormFieldWrapper<string>
                    field={field}
                    label="Training Address *"
                  >
                    {(p) => (
                      <Input
                        {...p.inputProps}
                        placeholder="Enter training address, e.g. House/Road, Area, City"
                        autoComplete="street-address"
                      />
                    )}
                  </FormFieldWrapper>
                )}
              </form.Field>

              {/* 7. Trainer Gender */}
              <form.Field name="gender">
                {(field) => (
                  <FormFieldWrapper<string>
                    field={field}
                    label="Trainer Gender *"
                  >
                    {(p) => (
                      <Select
                        value={p.inputProps.value}
                        onValueChange={(val) => p.onChangeValue(val)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </FormFieldWrapper>
                )}
              </form.Field>

              {/* 5. Time */}
              <form.Field name="time">
                {(field) => (
                  <FormFieldWrapper<string> field={field} label="Time *">
                    {(p) => (
                      <Input
                        {...p.inputProps}
                        type="time"
                        placeholder="Preferred time"
                      />
                    )}
                  </FormFieldWrapper>
                )}
              </form.Field>
              {/* error */}
              <SubmitErrorSummary errors={submitErrors} />
            </CardContent>
            <CardFooter>
              <div className="flex flex-col gap-2 w-full">
                <Button type="button" variant="outline" onClick={resetAll}>
                  Reset
                </Button>

                <SubmitButton
                  form="train-at-home"
                  isLoading={mutation.isPending}
                >
                  Submit
                </SubmitButton>
              </div>
            </CardFooter>
          </Card>
        </FieldGroup>
      </form>
    </div>
  );
}
