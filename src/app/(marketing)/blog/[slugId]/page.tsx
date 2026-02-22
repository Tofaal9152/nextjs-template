import SlugIdPage from "@/features/marketting/_pages/blog/slug-id/SlugIdPage";

const page = async ({ params }: { params: { slugId: string } }) => {
  const { slugId } = await params;
  return <SlugIdPage slugId={slugId} />;
};

export default page;
