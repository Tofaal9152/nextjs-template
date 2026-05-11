import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Edit, Eye } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

type DialogSize = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";

export interface AppDialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;

  trigger?: React.ReactNode;

  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;

  size?: DialogSize;

  contentClassName?: string;
  bodyClassName?: string;
  className?: string;

  mode?: "view" | "edit" | "default";
}

const sizeClasses: Record<DialogSize, string> = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
  "3xl": "sm:max-w-3xl",
  "4xl": "sm:max-w-4xl",
  "5xl": "sm:max-w-5xl",
  "6xl": "sm:max-w-6xl",
  "7xl": "sm:max-w-7xl",
};

export function AppDialog({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  footer,
  size = "2xl",
  mode = "edit",
  className,
  contentClassName,
  bodyClassName,
}: AppDialogProps) {
  const defaultTrigger = React.useMemo(() => {
    if (mode === "edit") {
      return (
        <Button variant="default" size="sm" className="gap-2">
          <Edit size={16} />
          Edit
        </Button>
      );
    }

    if (mode === "view") {
      return (
        <Button variant="default" size="sm" className="gap-2">
          <Eye size={16} />
          View
        </Button>
      );
    }

    return (
      <Button variant="default" size="sm">
        Open
      </Button>
    );
  }, [mode]);

  return (
    <Dialog open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger ?? defaultTrigger}</DialogTrigger>

      <DialogContent
        className={cn(sizeClasses[size], "p-0", className, contentClassName)}
      >
        {(title || description) && (
          <DialogHeader className="border-b  px-4 py-4">
            {title && (
              <DialogTitle className="text-base font-semibold ">
                {title}
              </DialogTitle>
            )}
            {description && (
              <DialogDescription className="text-sm ">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}

        {children && (
          <ScrollArea className="max-h-[70vh]">
            <div className={cn("px-4 pb-4", bodyClassName)}>{children}</div>
          </ScrollArea>
        )}

        {footer && <DialogFooter className="px-4 py-3">{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
