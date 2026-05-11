import { useFetchData } from "@/hooks/use-fetch-data";
import { makeEndpoint } from "@/lib/http/make-endpoint";

export const BLOG_DETAILS_QUERY_KEY = "blog-details";
export const useBlogDetails = ({
  query,
}: {
  query: {
    page: number;
    search: string;
  };
}) => {
  const endPoint = makeEndpoint(`/administrator/classifier-records`, {
    view: "new-booking-only",
    p: query.page,
    search: query.search,
  });
  return useFetchData<any>({
    url: endPoint,
    querykey: [BLOG_DETAILS_QUERY_KEY, query],
    options: {},
  });
};
