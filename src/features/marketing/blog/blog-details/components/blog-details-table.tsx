"use client";

import DataTable from "@/components/shared/data-table";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";

import Pagination from "@/components/shared/pagination";
import { useBlogDetails } from "../queries/use-blog-details";
import { BlogDetailsColumns } from "./blog-details-column";
import BlogDetailsFilter from "./blog-details-filter";

export default function BlogsDetailsTable() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const {
    data: blogDetailsData,
    isLoading,
    error,
  } = useBlogDetails({ query: { page, search: query } });

  const list = blogDetailsData?.results ?? [];
  console.log("blogDetailsData", blogDetailsData);

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="space-y-4 ">
          <BlogDetailsFilter />
          <DataTable
            data={list}
            columns={BlogDetailsColumns as any}
            loading={isLoading}
            error={error?.message}
          />
        </CardContent>

        <CardFooter>
          <Pagination
            page={page}
            total={blogDetailsData?.count ?? 0}
            onPageChange={setPage}
          />
        </CardFooter>
      </Card>
    </div>
  );
}
