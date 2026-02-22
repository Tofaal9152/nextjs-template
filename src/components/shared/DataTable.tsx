"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import AsyncStateWrapper from "@/components/shared/AsyncStateWrapper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData> {
  data?: TData[]; // allow undefined
  columns: ColumnDef<TData>[];
  loading?: boolean;
  error?: string;
}

export default function DataTable<TData>({
  data,
  columns,
  loading = false,
  error = "",
}: DataTableProps<TData>) {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: data ?? [], // ⬅️ key line: fallback to []
    columns: columns ?? [], // (optional safety)
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <AsyncStateWrapper loading={loading} error={error}>
      <div className="w-full ">
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className=" text-center">
                    Not found any data. Try to adjust your filters or add new
                    data.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AsyncStateWrapper>
  );
}
