"use client";

import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import React from "react";

type Option = { value: string; label: string; disabled?: boolean };

interface ReusableSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: ReadonlyArray<Readonly<Option>>;
  description?: string;
  error?: string;
  className?: string;
  placeholder?: string;
}

export const ReusableSelect = React.forwardRef<
  HTMLSelectElement,
  ReusableSelectProps
>(
  (
    { label, options, placeholder, description, error, className, ...props },
    ref
  ) => {
    return (
      <div>
        {label && <label className="text-sm font-medium w-full">{label}</label>}

        <NativeSelect ref={ref} {...props} className={className ?? "w-full "}>
          <NativeSelectOption value="" className="bg-accent">
            {placeholder ?? "Select"}
          </NativeSelectOption>
          {options.map((opt, idx) => (
            <NativeSelectOption
              key={idx}
              value={opt.value}
              disabled={opt.disabled}
              className="bg-accent"
            >
              {opt.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>

        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

ReusableSelect.displayName = "ReusableSelect";
