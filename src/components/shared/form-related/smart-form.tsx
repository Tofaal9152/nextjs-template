"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, CheckCircle } from "lucide-react";
import React, { useEffect } from "react";
import {
  FieldPath,
  FieldValues,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Spinner } from "@/components/ui/spinner";


export interface FormFieldOption {
  value: string;
  label: string;
}

export interface SmartFormProps<T extends FieldValues = FieldValues> {
  schema: z.ZodSchema<T>;
  mutationFn: (data: T) => Promise<any>;
  queryKey?: string[];
  mode?: "create" | "edit";
  defaultValues?: Partial<T>;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  submitText?: string;
  className?: string;
  children: (form: UseFormReturn<T>) => React.ReactNode;
}

export interface SmartFormFieldProps<T extends FieldValues = FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "textarea"
    | "select"
    | "shadcnSelect"
    | "checkbox"
    | "date"
    | "radio"
    | "file"
    | "time"
    | "color"
    | "switch";

  label?: string;
  placeholder?: string;
  description?: string;
  options?: FormFieldOption[];
  disabled?: boolean;
  className?: string;
}

export interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function SmartForm<T extends FieldValues>({
  schema,
  mutationFn,
  queryKey = [],
  mode = "create",
  defaultValues,
  onSuccess,
  onError,
  submitText,
  className,
  children,
}: SmartFormProps<T>) {
  const queryClient = useQueryClient();

  const form = useForm<T>({
    // @ts-expect-error // TODO: fix this
    resolver: zodResolver(schema),
    defaultValues: (defaultValues || {}) as any,
  });
  // 🔥 IMPORTANT: Automatically update form when defaultValues change
  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues as any);
    }
  }, [defaultValues, form]);

  const mutation = useMutation({
    mutationFn,
    onSuccess: (data) => {
      if (queryKey.length > 0) {
        queryClient.invalidateQueries({ queryKey });
      }

      form.reset(defaultValues as any);
      onSuccess?.(data);
      toast.success("Successfully submitted!");
    },
    onError: (error) => {
      onError?.(error instanceof Error ? error : new Error("Unknown error"));
      toast.error(
        error instanceof Error && "response" in error
          ? (error as any).response?.data?.message || "An error occurred."
          : "An unknown error occurred."
      );
    },
  });

  const onSubmit = (data: T) => {
    mutation.mutate(data);
  };

  return (
    <Card className={cn("w-full ", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit as any)}>
          <CardContent>
            <div className="space-y-6">{children(form as any)}</div>

            <div className="flex items-center justify-end pt-6 mt-6 border-t">
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="min-w-32"
              >
                {mutation.isPending ? (
                  <>
                    <Spinner />
                    {mode === "create" ? "Creating..." : "Updating..."}
                  </>
                ) : (
                  <>
                    {mutation.isSuccess ? (
                      <CheckCircle className="mr-2 h-4 w-4" />
                    ) : mutation.isError ? (
                      <AlertCircle className="mr-2 h-4 w-4" />
                    ) : null}
                    {submitText || (mode === "create" ? "Create" : "Update")}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}

export function SmartFormField<T extends FieldValues>({
  form,
  name,
  type,
  label,
  placeholder,
  description,
  options = [],
  disabled,
  className,
}: SmartFormFieldProps<T>) {
  const renderField = (field: any) => {
    switch (type) {
      case "text":
      case "email":
      case "password":
        return (
          <Input
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            {...field}
            value={field.value || ""}
            
          />
        );

      case "number":
        return (
          <Input
            type="number"
            placeholder={placeholder}
            disabled={disabled}
            {...field}
            value={field.value || ""}
            onChange={(e) => {
              const value = e.target.value;
              field.onChange(value === "" ? undefined : Number(value));
            }}
          />
        );

      case "textarea":
        return (
          <Textarea
            placeholder={placeholder}
            disabled={disabled}
            rows={3}
            {...field}
            value={field.value || ""}
          />
        );

      case "select":
        return (
          <NativeSelect
            value={field.value || ""}
            onChange={(e) => field.onChange(e.target.value)}
            disabled={disabled}
            className="w-full bg-accent"
          >
            {/* Default placeholder option */}
            <NativeSelectOption value="" disabled>
              {placeholder || `Select ${label}`}
            </NativeSelectOption>

            {options.map((option, idx) => (
              <NativeSelectOption key={idx} value={option.value}>
                {option.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        );

      case "shadcnSelect":
        return (
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={disabled}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder || `Select ${label}`} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={field.value || false}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
            <label className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {label}
            </label>
          </div>
        );

      case "radio":
        return (
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={disabled}
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={`${name}-${option.value}`}
                />
                <label
                  htmlFor={`${name}-${option.value}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </RadioGroup>
        );
      case "date":
        return (
          <Input
            type="date"
            placeholder={placeholder}
            disabled={disabled}
            {...field}
            value={field.value || ""}
          />
        );
      case "file":
        return (
          <Input
            type="file"
            placeholder={placeholder}
            disabled={disabled}
            onChange={(e) => {
              field.onChange(e.target.files);
            }}
          />
        );
      case "time":
        return (
          <Input
            type="time"
            placeholder={placeholder}
            disabled={disabled}
            {...field}
            value={field.value || ""}
          />
        );
      case "switch":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={field.value || false}
              onCheckedChange={field.onChange}
              disabled={disabled}
              className="switch-checkbox"
            />
            <label className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {label}
            </label>
          </div>
        );
      case "color":
        return (
          <div className="flex items-center space-x-2">
            <Input
              type="color"
              disabled={disabled}
              className="w-12 h-10 p-1 border rounded"
              value={field.value || "#000000"}
              onChange={(e) => field.onChange(e.target.value)}
            />
            <Input
              type="text"
              placeholder="#000000"
              disabled={disabled}
              className="flex-1"
              value={field.value || ""}
              onChange={(e) => field.onChange(e.target.value)}
            />
          </div>
        );

      default:
        return null;
    }
  };

  if (type === "checkbox") {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className={cn("space-y-2", className)}>
            <FormControl>{renderField(field)}</FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>{renderField(field)}</FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function FormSection({
  title,
  description,
  children,
  className,
}: FormSectionProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-1">
        <h3 className="text-lg font-medium">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export function ConditionalField<T extends FieldValues>({
  form,
  when,
  equals,
  children,
}: {
  form: UseFormReturn<T>;
  when: FieldPath<T>;
  equals: any;
  children: React.ReactNode;
}) {
  const watchedValue = form.watch(when);

  if (watchedValue === equals) {
    return <>{children}</>;
  }

  return null;
}
