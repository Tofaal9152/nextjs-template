"use client";

import type { SubmitErrorItem } from "@/hooks/useZodTanstackForm";

export function SubmitErrorSummary({
  errors,
  title = "Please fix the following:",
}: {
  errors: SubmitErrorItem[];
  title?: string;
}) {
  if (!errors?.length) return null;

  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-3 dark:border-red-900 dark:bg-red-950">
      <p className="text-sm font-medium text-red-700 dark:text-red-200">{title}</p>

      <ul className="mt-2 list-disc pl-5 text-sm text-red-700 dark:text-red-200 space-y-1">
        {errors.map((e) => (
          <li key={`${e.field}-${e.message}`}>
            <span className="font-medium">{e.label ?? e.field}:</span> {e.message}
          </li>
        ))}
      </ul>
    </div>
  );
}