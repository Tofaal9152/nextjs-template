"use client";

import * as React from "react";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

type ChildProps<T> = {
  isInvalid: boolean;
  // ✅ ready props for <Input />
  inputProps: {
    id: string;
    name: string;
    value: T;
    onBlur: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    "aria-invalid": boolean;
  };

  onChangeValue: (value: T) => void;
};

export function FormFieldWrapper<T>({
  field,
  label,
  children,
}: {
  field: AnyFieldApi;
  label: string;
  children: (p: ChildProps<T>) => React.ReactNode;
}) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const inputProps = {
    id: field.name,
    name: field.name,
    value: field.state.value as T,
    onBlur: field.handleBlur,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      field.handleChange(e.target.value as any),
    "aria-invalid": isInvalid,
  };

  return (
    <Field data-invalid={isInvalid} className="flex flex-col gap-1">
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

      {children({
        isInvalid,
        inputProps,
        onChangeValue: field.handleChange as any,
      })}

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
