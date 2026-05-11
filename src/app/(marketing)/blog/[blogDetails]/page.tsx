import BlogDetailsIndex from "@/features/marketing/blog/blog-details";

const page = async ({ params }: { params: { blogDetails: string } }) => {
  const { blogDetails } = await params;
  return <BlogDetailsIndex paramsId={blogDetails} />;
};

export default page;
