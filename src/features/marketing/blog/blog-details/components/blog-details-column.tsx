import DeleteMutation from "@/components/shared/delete-mutation";
import { ColumnDef } from "@tanstack/react-table";

export const BlogDetailsColumns: ColumnDef<any>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "content",
    header: "Content",
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-end items-center gap-4">
          <DeleteMutation
            endpoint={`/blogs/${row.original.id}/`}
            successMessage="Blog post deleted successfully!"
            errorMessage="Failed to delete blog post. Please try again."
            invalidateKeys={[["blogs"]]}
            confirmMessage="Are you sure you want to delete this blog post?"
            confirmDescription="This action cannot be undone. This will permanently delete the blog post and its associated data from our servers."
          />
        </div>
      );
    },
  },
];
