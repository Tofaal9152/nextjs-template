"use client";

interface NativeSelectProps {
  form: any;
  name: string;
  label: string;
  data: any[];
  valueKey?: string; // default: "name"
  labelKey?: string; // default: "name"
  placeholder?: string;
  disabled?: boolean;
}

export default function NativeSelect({
  form,
  name,
  label,
  data,
  valueKey = "name",
  labelKey = "name",
  placeholder = "Select...",
  disabled = false,
}: NativeSelectProps) {
  const options =
    data?.map((item) => ({
      value: item?.[valueKey],
      label: item?.[labelKey],
    })) ?? [];

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium" htmlFor={name}>
        {label}
      </label>

      <select
        id={name}
        disabled={disabled}
        {...form.register(name)}
        className="border rounded-md px-3 py-2 disabled:bg-gray-100 bg-accent"
      >
        <option value="">{placeholder}</option>
        {options.map(
          (opt,idx) =>
            opt.value && (
              <option key={idx} value={opt.value}>
                {opt.label}
              </option>
            )
        )}
      </select>

      {form.formState?.errors?.[name] && (
        <span className="text-red-500 text-xs">
          {form.formState.errors[name]?.message as string}
        </span>
      )}
    </div>
  );
}
