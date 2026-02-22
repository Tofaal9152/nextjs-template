"use client";

import { useRef, useState } from "react";
import { uploadSingleFile } from "@/services/uploadFile.service";
import { Button } from "@/components/ui/button";
import { X, Upload } from "lucide-react";

type Props = {
  label?: string;
  value: string[];
  onChange: (urls: string[]) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  disabled?: boolean;
};

export default function MultiFileUploader({
  label = "Upload",
  value,
  onChange,
  accept = "image/*",
  multiple = true,
  maxFiles,
  disabled,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  const handlePick = () => inputRef.current?.click();

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const selected = Array.from(files);

    // maxFiles guard
    if (maxFiles && value.length + selected.length > maxFiles) {
      // You can replace alert with your toast
      alert(`You can upload максимум ${maxFiles} files`);
      return;
    }

    try {
      setUploading(true);

      // Upload all selected files
      const uploadedUrls = await Promise.all(
        selected.map((f) => uploadSingleFile(f))
      );

      onChange([...(value ?? []), ...uploadedUrls]);
    } catch (e: any) {
      console.error(e);
      alert(e?.message || "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const removeAt = (idx: number) => {
    const next = value.filter((_, i) => i !== idx);
    onChange(next);
  };

  const isImage = (url: string) =>
    /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(url) || url.includes("image");

  return (
    <div className="space-y-2">
      {label ? <p className="text-sm font-medium">{label}</p> : null}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
        disabled={disabled || uploading}
      />

      <Button
        type="button"
        variant="outline"
        onClick={handlePick}
        disabled={disabled || uploading}
        className="gap-2"
      >
        <Upload className="h-4 w-4" />
        {uploading ? "Uploading..." : "Choose Image(s)"}
      </Button>

      {/* Preview list */}
      {value?.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {value.map((url, idx) => (
            <div
              key={`${url}-${idx}`}
              className="relative rounded-lg border overflow-hidden"
            >
              {isImage(url) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={url}
                  alt="uploaded"
                  className="h-28 w-full object-cover"
                />
              ) : (
                <div className="p-3 text-xs break-all">{url}</div>
              )}

              <button
                type="button"
                onClick={() => removeAt(idx)}
                className="absolute top-1 right-1 rounded-full p-1"
                disabled={disabled || uploading}
                title="Remove"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>No image uploaded</div>
      )}
    </div>
  );
}
