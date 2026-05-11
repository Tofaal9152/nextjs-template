"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Trash2Icon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { request } from "@/lib/http/request";
import { useMutationHandler } from "../../hooks/use-mutation-handler";

interface DeleteButtonProps {
  endpoint: string;
  invalidateKeys?: string[][];
  confirmMessage: string;
  confirmDescription: string;
  successMessage: string;
  errorMessage: string;
  variant?: "destructive" | "default" | "outline";
  size?: "sm" | "md" | "lg" | "icon" | "default";
}

const DeleteMutation = ({
  endpoint,
  invalidateKeys,
  successMessage = "Deleted successfully!",
  errorMessage,
  confirmMessage = "Are you absolutely sure?",
  confirmDescription = "This action cannot be undone. This will permanently delete this item and remove the data from our servers.",
  // button related props can be added here if needed
  variant = "destructive",
  size = "default",
}: DeleteButtonProps) => {
  const { mutate, isPending } = useMutationHandler({
    mutationFn: () => request.delete(endpoint),
    invalidateKeys: invalidateKeys,
    successMessage,
    errorMessage,
    debugLabel: "Delete Mutation"
  });

  const handleDelete = () => {
    mutate({});
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" disabled={isPending} size={"sm"}>
          {isPending ? <Spinner className="w-4 h-4 mr-1" /> : <Trash2Icon />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{confirmMessage}</AlertDialogTitle>
          <AlertDialogDescription>{confirmDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant={variant}
              size={size ? "default" : size}
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Spinner className="w-4 h-4 mr-2" />
                  Deleting...
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteMutation;
