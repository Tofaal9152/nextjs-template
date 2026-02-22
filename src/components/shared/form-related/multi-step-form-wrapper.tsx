"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { createContext, useCallback, useContext, useState } from "react";
import { DefaultValues, useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormData = Record<string, unknown>;

interface MultiStepFormContextType<T extends FormData = FormData> {
  currentStep: number;
  totalSteps: number;
  formData: T;
  updateFormData: (stepData: Partial<T>) => void;
  goToNextStep: () => Promise<void>;
  goToPrevStep: () => void;
  goToStep: (step: number) => void;
  resetForm: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isComplete: boolean;
  isLoading: boolean;
  form: UseFormReturn<T>;
  getProgressPercentage: () => number;
  stepErrors: Record<number, string>;
}

const MultiStepFormContext = createContext<
  MultiStepFormContextType<any> | undefined
>(undefined);

export function useMultiStepForm<T extends FormData = FormData>() {
  const context = useContext(
    MultiStepFormContext
  ) as MultiStepFormContextType<T>;
  if (!context)
    throw new Error(
      "useMultiStepForm must be used within a MultiStepFormWrapper"
    );
  return context;
}

export interface StepProps<T extends FormData = FormData> {
  children: React.ReactNode;
  title?: string;
  description?: string;
  validate?: (data: T) => Promise<boolean> | boolean;
  schema?: z.ZodObject<any>;
  canSkip?: boolean;
  isOptional?: boolean;
  validationMessage?: string;
  onEnter?: (data: T) => void;
  onExit?: (data: T) => void;
}

export interface MultiStepFormWrapperProps<T extends FormData = FormData> {
  children: React.ReactNode;
  className?: string;

  // ✅ NEW: TanStack submit
  mutationFn: (data: T) => Promise<any>;
  queryKey?: string[];
  onSuccess?: (data: any, submitted: T) => void;
  onError?: (error: unknown) => void;
  successToast?: string;
  errorToast?: string;

  firstStepBackUrl?: string;

  initialData?: Partial<T>;
  showStepIndicator?: boolean;
  showStepTitle?: boolean;
  allowSkipSteps?: boolean;
  navigationPosition?: "bottom" | "top";
  nextButtonText?: string;
  prevButtonText?: string;
  completeButtonText?: string;
  onStepChange?: (prevStep: number, nextStep: number) => void;
  schema?: z.ZodType<T>;
  persistKey?: string;
  onStepValidationError?: (step: number, errors: any) => void;
  showProgressBar?: boolean;
  allowStepReset?: boolean;
  autoSave?: boolean;
  autoSaveDelay?: number;
  transitionDuration?: number;
  animateStepChange?: boolean;
}

export function Step<T extends FormData = FormData>({
  children,
}: StepProps<T>): React.ReactNode {
  return <>{children}</>;
}

export function MultiStepFormWrapper<T extends FormData = FormData>({
  children,
  className,

  // ✅ NEW
  mutationFn,
  queryKey = [],
  onSuccess,
  onError,
  successToast = "Successfully submitted!",
  errorToast = "Something went wrong.",

  firstStepBackUrl,

  initialData = {} as Partial<T>,
  showStepIndicator = true,
  showStepTitle = true,
  allowSkipSteps = false,
  navigationPosition = "bottom",
  nextButtonText = "Next",
  prevButtonText = "Back",
  completeButtonText = "Complete",
  onStepChange,
  schema,
  persistKey,
  onStepValidationError,
  showProgressBar = false,
  allowStepReset = false,
  autoSave = false,
  autoSaveDelay = 1000,
  transitionDuration = 300,
  animateStepChange = true,
}: MultiStepFormWrapperProps<T>): React.ReactNode {
  const steps = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === Step
  ) as React.ReactElement<StepProps<T>>[];

  const prepareDefaultValues = useCallback(
    (initialData: Partial<T>, schema?: z.ZodType<T>): DefaultValues<T> => {
      const defaultValues = { ...initialData } as Record<string, any>;

      if (schema && "shape" in schema) {
        const shapes = (schema as any).shape;
        Object.keys(shapes).forEach((key) => {
          if (defaultValues[key] === undefined) defaultValues[key] = "";
        });
      }

      return defaultValues as DefaultValues<T>;
    },
    []
  );
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<T>(initialData as T);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [stepErrors, setStepErrors] = useState<Record<number, string>>({});
  const [apiError, setApiError] = useState<string>("");

  const form = useForm<T>({
    defaultValues: prepareDefaultValues(initialData, schema),
    // @ts-expect-error-ignore // TODO: fix this
    resolver: schema ? zodResolver(schema) : undefined,
    mode: "onChange",
  });

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const CurrentStepComponent = steps[currentStep];
  const {
    title,
    description,
    schema: stepSchema,
    onEnter,
    onExit,
  } = CurrentStepComponent?.props || {};

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: T) => mutationFn(payload),
    onSuccess: (data, variables) => {
      if (queryKey.length) queryClient.invalidateQueries({ queryKey });
      toast.success(successToast);
      onSuccess?.(data, variables);
      resetForm();
    },
    onError: (err: any) => {
      console.log(err);

      const errorMessage =
        err?.response?.data?.message || err?.message || errorToast;

      setApiError(errorMessage);
      toast.error(errorMessage);
      onError?.(err);
    },
  });

  React.useEffect(() => {
    if (!autoSave || !persistKey) return;
    const handler = setTimeout(() => {
      try {
        localStorage.setItem(persistKey, JSON.stringify(formData));
      } catch (error) {
        console.warn("Failed to save form data to localStorage:", error);
      }
    }, autoSaveDelay);
    return () => clearTimeout(handler);
  }, [formData, autoSave, persistKey, autoSaveDelay]);

  React.useEffect(() => {
    if (!persistKey) return;
    try {
      const savedData = localStorage.getItem(persistKey);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setFormData((prevData) => ({ ...prevData, ...parsedData }));
        Object.entries(parsedData).forEach(([key, value]) => {
          form.setValue(key as any, value as any);
        });
      }
    } catch (error) {
      console.warn("Failed to load form data from localStorage:", error);
    }
  }, [persistKey, form]);

  React.useEffect(() => {
    if (onEnter) onEnter(formData);
    return () => {
      if (onExit) onExit(formData);
    };
  }, [currentStep, formData, onEnter, onExit]);

  React.useEffect(() => {
    if (stepSchema) form.clearErrors();
  }, [currentStep, form, stepSchema]);

  const updateFormData = useCallback(
    (stepData: Partial<T>): void => {
      setFormData((prev) => ({ ...prev, ...stepData }));
      Object.entries(stepData).forEach(([key, value]) => {
        form.setValue(key as any, value as any);
      });
    },
    [form]
  );

  const resetForm = useCallback((): void => {
    setCurrentStep(0);
    setFormData(initialData as T);
    setIsComplete(false);
    setStepErrors({});
    form.reset(prepareDefaultValues(initialData, schema));

    if (persistKey) {
      try {
        localStorage.removeItem(persistKey);
      } catch (error) {
        console.warn("Failed to clear persisted form data:", error);
      }
    }

    // optional: clear mutation state
    mutation.reset();
  }, [initialData, schema, form, persistKey, prepareDefaultValues, mutation]);

  const getProgressPercentage = useCallback((): number => {
    return Math.round(((currentStep + 1) / steps.length) * 100);
  }, [currentStep, steps.length]);
  function getFirstErrorMessage(
    errors: any
  ): { path: string; message: string } | null {
    if (!errors) return null;

    // RHF error leaf usually has { message, type, ref }
    if (typeof errors?.message === "string") {
      return { path: "", message: errors.message };
    }

    if (Array.isArray(errors)) {
      for (let i = 0; i < errors.length; i++) {
        const found = getFirstErrorMessage(errors[i]);
        if (found) return found;
      }
      return null;
    }

    if (typeof errors === "object") {
      for (const key of Object.keys(errors)) {
        const found = getFirstErrorMessage(errors[key]);
        if (found) {
          return {
            path: found.path ? `${key}.${found.path}` : key,
            message: found.message,
          };
        }
      }
    }

    return null;
  }

  function pickErrorsByTopLevelKeys(errors: any, keys: string[]) {
    const out: any = {};
    for (const k of keys) {
      if (errors?.[k]) out[k] = errors[k];
    }
    return out;
  }
  const goToNextStep = useCallback(async (): Promise<void> => {
    const validate = CurrentStepComponent?.props.validate;
    const stepSchema = CurrentStepComponent?.props.schema;
    const canSkip = CurrentStepComponent?.props.canSkip || false;

    setStepErrors((prev) => {
      const next = { ...prev };
      delete next[currentStep];
      return next;
    });

    // Always sync form data before validation
    const currentFormValues = form.getValues();
    updateFormData(currentFormValues);

    // Step-level schema validation
    if (stepSchema && !canSkip) {
      setIsValidating(true);
      try {
        const stepFields = Object.keys(stepSchema.shape);
        const result = await form.trigger(stepFields as any);
        if (!result) {
          const formErrors = form.formState.errors;

          // ✅ get only errors from this step (top-level fields)
          const stepFields = Object.keys(stepSchema.shape);
          const stepOnlyErrors = pickErrorsByTopLevelKeys(
            formErrors,
            stepFields
          );

          // ✅ pick the first exact error message
          const first =
            getFirstErrorMessage(stepOnlyErrors) ||
            getFirstErrorMessage(formErrors);

          const exactMsg =
            first?.message ||
            CurrentStepComponent?.props.validationMessage ||
            "Please fix the validation errors";

          // Optional: show which field is wrong (nice UX)
          const msgWithField = first?.path
            ? `${first.path}: ${exactMsg}`
            : exactMsg;

          setStepErrors((prev) => ({ ...prev, [currentStep]: msgWithField }));

          onStepValidationError?.(currentStep, stepOnlyErrors);
          return;
        }
      } finally {
        setIsValidating(false);
      }
    } else if (validate && !canSkip) {
      setIsValidating(true);
      try {
        const isValid = await validate({ ...formData, ...currentFormValues });
        if (!isValid) {
          const msg =
            CurrentStepComponent?.props.validationMessage ||
            "Validation failed";
          setStepErrors((prev) => ({ ...prev, [currentStep]: msg }));
          return;
        }
      } finally {
        setIsValidating(false);
      }
    }

    // Final submit
    if (isLastStep) {
      if (schema) {
        const ok = await form.trigger();
        if (!ok) return;
      }

      setIsComplete(true);

      try {
        const finalData = { ...formData, ...currentFormValues } as T;
        await mutation.mutateAsync(finalData);

        // if you want to reset on success:
        // resetForm()
      } catch (e) {
        // onError is handled by mutation, but keep UX consistent for stepErrors
        setStepErrors((prev) => ({
          ...prev,
          [currentStep]: "Failed to complete form submission",
        }));
        setIsComplete(false);
      }

      return;
    }

    const prevStep = currentStep;
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    onStepChange?.(prevStep, nextStep);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    CurrentStepComponent?.props,
    currentStep,
    form,
    formData,
    isLastStep,
    mutation,
    onStepChange,
    onStepValidationError,
    schema,
    updateFormData,
  ]);

  const goToPrevStep = useCallback((): void => {
    if (isFirstStep) return;
    const prevStep = currentStep;
    const nextStep = currentStep - 1;
    setCurrentStep(nextStep);
    onStepChange?.(prevStep, nextStep);
  }, [currentStep, isFirstStep, onStepChange]);

  const goToStep = useCallback(
    (step: number): void => {
      if (
        step < 0 ||
        step >= steps.length ||
        (!allowSkipSteps && step > currentStep)
      )
        return;
      const prevStep = currentStep;
      setCurrentStep(step);
      onStepChange?.(prevStep, step);
    },
    [allowSkipSteps, currentStep, steps.length, onStepChange]
  );

  const renderNavigation = (): React.ReactNode => (
    <div className="flex justify-between items-center mt-6 gap-4">
      <Button
        variant={"outline"}
        onClick={() => {
          if (isFirstStep) {
            if (firstStepBackUrl) router.push(firstStepBackUrl);
            return;
          }
          goToPrevStep();
        }}
        disabled={isValidating || mutation.isPending}
        className={cn(
          "gap-1 flex-1 rounded-2xl border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800",
          isFirstStep && !firstStepBackUrl && "invisible"
        )}
      >
        <ChevronLeft size={16} />
        {prevButtonText}
      </Button>

      <Button
        onClick={() => void goToNextStep()}
        disabled={isValidating || mutation.isPending}
        className="gap-1 flex-1  dark:bg-cyan-600 dark:hover:bg-cyan-700  w-full bg-[#ba170b] text-white font-medium hover:bg-[#a01409] transition-colors rounded-3xl"
      >
        {isValidating || mutation.isPending ? (
          <>
            <LoaderCircle size={16} className="animate-spin mr-2" /> loading...
          </>
        ) : isLastStep ? (
          completeButtonText
        ) : (
          <>
            {nextButtonText}
            <ChevronRight size={16} />
          </>
        )}
      </Button>
    </div>
  );

  const contextValue = React.useMemo(
    () => ({
      currentStep,
      totalSteps: steps.length,
      formData,
      updateFormData,
      goToNextStep,
      goToPrevStep,
      goToStep,
      resetForm,
      isFirstStep,
      isLastStep,
      isComplete,
      isLoading: isValidating || mutation.isPending,
      form,
      getProgressPercentage,
      stepErrors,
    }),
    [
      currentStep,
      steps.length,
      formData,
      updateFormData,
      goToNextStep,
      goToPrevStep,
      goToStep,
      resetForm,
      isFirstStep,
      isLastStep,
      isComplete,
      isValidating,
      mutation.isPending,
      form,
      getProgressPercentage,
      stepErrors,
    ]
  );

  return (
    <div
      className={cn(
        "border p-4 bg-white dark:bg-gray-900 rounded-2xl shadow z-10 relative",
        className
      )}
    >
      <MultiStepFormContext.Provider value={contextValue}>
        <div>
          {/* 1) TITLE */}
          {showStepTitle && title && (
            <h2 className="text-center text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h2>
          )}

          {/* 2) STEP COUNT + DESCRIPTION */}
          {(showStepTitle || showStepIndicator) && (
            <p className="mt-1 text-center text-xs text-gray-500 dark:text-white/45">
              Step {currentStep + 1} of {steps.length}
              {description ? ` — ${description}` : ""}
            </p>
          )}

          {/* 3) DOT STEPS */}
          {showStepIndicator && (
            <div className="mt-4 flex items-center justify-center gap-2">
              {steps.map((_, index) => {
                const isDone = index < currentStep;
                const isActive = index === currentStep;

                return (
                  <div
                    key={index}
                    className={cn(
                      "h-2.5 w-2.5 rounded-full transition-all",
                      isDone || isActive
                        ? "bg-cyan-500 dark:bg-cyan-400"
                        : "bg-gray-300 dark:bg-white/15",
                      isActive &&
                        "ring-2 ring-cyan-500/35 dark:ring-cyan-400/35 ring-offset-2 ring-offset-white dark:ring-offset-gray-900"
                    )}
                  />
                );
              })}
            </div>
          )}

          {/* 4) CONTENT */}
          <div
            className={cn(
              "mt-6",
              animateStepChange && "transition-all ease-in-out"
            )}
            style={{
              transitionDuration: animateStepChange
                ? `${transitionDuration}ms`
                : undefined,
            }}
          >
            {CurrentStepComponent}
          </div>
          {/* ERROR (optional) */}
          {(stepErrors[currentStep] || apiError) && (
            <div className="mt-5 rounded-xl border border-red-500/25 bg-red-100 dark:bg-red-500/10 px-4 py-3">
              <p className="text-sm text-red-600 dark:text-red-200">
                {apiError || stepErrors[currentStep]}
              </p>
            </div>
          )}

          {/* 5) BUTTONS */}
          {(navigationPosition === "bottom" ||
            navigationPosition === "top") && (
            <div className="mt-6">{renderNavigation()}</div>
          )}
        </div>
      </MultiStepFormContext.Provider>
    </div>
  );
}
