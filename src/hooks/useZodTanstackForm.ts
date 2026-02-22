"use client";

import { getSubmitFieldErrorsFromMeta } from "@/utils/formErrors";
import { useForm } from "@tanstack/react-form";
import { useMemo, useState } from "react";
import type { ZodSchema } from "zod";

type AnyMutationLike<T> = {
  mutate: (data: T) => void;
  reset: () => void;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: unknown;
};

export type SubmitErrorItem = {
  field: string; // e.g. "phone_number"
  label?: string; // e.g. "Phone Number"
  message: string; // e.g. "Required"
};

type Options<TValues extends Record<string, any>> = {
  defaultValues: TValues;
  schema: ZodSchema<TValues>;
  mutation: AnyMutationLike<TValues>;
  onValidSubmit?: (values: TValues) => void;

  // ✅ optional configuration for reuse
  fieldLabels?:
    | Partial<Record<keyof TValues & string, string>>
    | Record<string, string>;
  formatError?: (item: { field: string; message: string }) => SubmitErrorItem;
  clearErrorsOnChange?: boolean; // default: false
};

export function useZodTanstackForm<TValues extends Record<string, any>>(
  opts: Options<TValues>,
) {
  const {
    defaultValues,
    schema,
    mutation,
    onValidSubmit,
    fieldLabels,
    formatError,
    clearErrorsOnChange = false,
  } = opts;

  const [submitErrors, setSubmitErrors] = useState<SubmitErrorItem[]>([]);

  const makeItem = (field: string, message: string): SubmitErrorItem => {
    if (formatError) return formatError({ field, message });

    const label =
      (fieldLabels && (fieldLabels as Record<string, string>)[field]) ||
      undefined;

    return { field, label, message };
  };

  const form = useForm({
    defaultValues,
    validators: { onSubmit: schema as any },

    onSubmitInvalid: ({ formApi }) => {
      const errorsObj =
        getSubmitFieldErrorsFromMeta(formApi.state.fieldMetaBase as any) ?? {};

      const list = Object.entries(errorsObj).flatMap(([field, msgs]) =>
        msgs.map((m) => makeItem(field, m)),
      );

      setSubmitErrors(list);
    },

    onSubmit: async ({ value }) => {
      onValidSubmit?.(value);
      mutation.mutate(value);
      resetAll();
    },
  });

  const clearSubmitErrors = () => setSubmitErrors([]);

  const resetAll = () => {
    form.reset();
    mutation.reset();
    setSubmitErrors([]);
  };

  const errorSummary = useMemo(() => {
    return {
      hasErrors: submitErrors.length > 0,
      items: submitErrors,
      // ready message helpers
      textItems: submitErrors.map((e) => `${e.label ?? e.field}: ${e.message}`),
    };
  }, [submitErrors]);

  return {
    form,
    mutation,
    resetAll,

    //  reusable error summary API
    submitErrors,
    setSubmitErrors,
    clearSubmitErrors,
    errorSummary,

    // optional flag (যদি বাইরে থেকে use করতে চান)
    clearErrorsOnChange,
  };
}
