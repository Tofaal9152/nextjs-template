import BlogsDetailsTable from "./components/blog-details-table";

export default function BlogDetailsIndex({ paramsId }: { paramsId: string }) {
  return (
    <div>
      Blog details page for blog ID: {paramsId}
      <section>
        <BlogsDetailsTable />
      </section>
    </div>
  );
}
