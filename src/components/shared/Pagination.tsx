import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  page = 1,
  total = 100,
  onPageChange = (): void => {},
}: {
  page?: number;
  total?: number;
  onPageChange?: (page: number) => void;
}) {
  const totalPages = Math.ceil(total / 10);

  return (
    <div className="flex items-center justify-center gap-2 w-full">
      <Button
        variant="outline"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft />
      </Button>

      <Button variant="ghost">
        {page} of {totalPages}
      </Button>

      <Button
        variant="outline"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
