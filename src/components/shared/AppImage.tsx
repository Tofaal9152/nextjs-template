import Image, { type ImageProps } from "next/image";
import { imagePath } from "@/constants/imagePath";

type AppImageProps = Omit<ImageProps, "src" | "alt"> & {
  src?: string | null;
  alt?: string;
  fallbackSrc?: string;
};

export default function AppImage({
  src,
  alt = "",
  fallbackSrc = imagePath.noImage,
  quality = 75,
  priority = false,
  ...props
}: AppImageProps) {
  const safeSrc = src ?? fallbackSrc;

  return (
    <Image
      {...props}
      src={safeSrc}
      alt={alt}
      quality={quality}
      priority={priority}
    />
  );
}
