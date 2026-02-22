"use client";

import { useRef, useState } from "react";
import { uploadSingleFile } from "@/services/uploadFile.service";
import { Button } from "@/components/ui/button";
import { X, Upload } from "lucide-react";

type Props = {
  label?: string;
  value?: string; // single uploaded URL
  onChange: (url: string) => void;
  accept?: string; // default image/*
  disabled?: boolean;
};

export default function SingleFileUploader({
  label = "Upload Image",
  value,
  onChange,
  accept = "image/*",
  disabled,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  const handlePick = () => inputRef.current?.click();

  const handleFile = async (file: File | null) => {
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadSingleFile(file);
      onChange(url);
    } catch (e: any) {
      console.error(e);
      alert(e?.message || "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const remove = () => onChange("");

  const isImage = (url: string) =>
    /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(url) || url.includes("image");

  return (
    <div className="space-y-2">
      {label ? <p className="text-sm font-medium">{label}</p> : null}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
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
        {uploading ? "Uploading..." : value ? "Change Image" : "Choose Image"}
      </Button>

      {value ? (
        <div className="relative mt-2 rounded-lg border overflow-hidden w-full max-w-sm">
          {isImage(value) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt="uploaded"
              className="h-40 w-full object-cover"
            />
          ) : (
            <div className="p-3 text-xs break-all">{value}</div>
          )}

          <button
            type="button"
            onClick={remove}
            className="absolute top-2 right-2 cursor-pointer rounded-full p-1"
            disabled={disabled || uploading}
            title="Remove"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
// "use client";

// import { useRef, useState } from "react";
// import { uploadSingleFile } from "@/services/uploadFile.service";
// import { Button } from "@/components/ui/button";
// import { X, Upload } from "lucide-react";

// type Props = {
//   label?: string;
//   value?: string; // single uploaded URL
//   onChange: (url: string) => void;
//   accept?: string; // default image/*
//   disabled?: boolean;
// };

// export default function SingleFileUploader({
//   label = "Upload Image",
//   value,
//   onChange,
//   accept = "image/*",
//   disabled,
// }: Props) {
//   const inputRef = useRef<HTMLInputElement | null>(null);
//   const [uploading, setUploading] = useState(false);

//   const handlePick = () => inputRef.current?.click();

//   const handleFile = async (file: File | null) => {
//     if (!file) return;

//     try {
//       setUploading(true);
//       const url = await uploadSingleFile(file);
//       onChange(url);
//     } catch (e: any) {
//       console.error(e);
//       alert(e?.message || "Upload failed");
//     } finally {
//       setUploading(false);
//       if (inputRef.current) inputRef.current.value = "";
//     }
//   };

//   const remove = () => onChange("");

//   const isImage = (url: string) =>
//     /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(url) || url.includes("image");

//   return (
//     <div className="space-y-2">
//       {label ? <p className="text-sm font-medium">{label}</p> : null}

//       <input
//         ref={inputRef}
//         type="file"
//         accept={accept}
//         className="hidden"
//         onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
//         disabled={disabled || uploading}
//       />

//       <Button
//         type="button"
//         variant="outline"
//         onClick={handlePick}
//         disabled={disabled || uploading}
//         className="gap-2"
//       >
//         <Upload className="h-4 w-4" />
//         {uploading ? "Uploading..." : value ? "Change Image" : "Choose Image"}
//       </Button>

//       {value ? (
//         <div className="relative mt-2 rounded-lg border overflow-hidden w-full max-w-sm">
//           {isImage(value) ? (
//             // eslint-disable-next-line @next/next/no-img-element
//             <img
//               src={value}
//               alt="uploaded"
//               className="h-40 w-full object-cover"
//             />
//           ) : (
//             <div className="p-3 text-xs break-all">{value}</div>
//           )}

//           <button
//             type="button"
//             onClick={remove}
//             className="absolute top-2 right-2  rounded-full p-1"
//             disabled={disabled || uploading}
//             title="Remove"
//           >
//             <X className="h-4 w-4" />
//           </button>
//         </div>
//       ) : null}
//     </div>
//   );
// }
