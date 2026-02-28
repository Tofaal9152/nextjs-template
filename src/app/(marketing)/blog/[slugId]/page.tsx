import SlugIdPage from "@/features/marketting/_pages/blog/ui/[slugId]Page";

const page = async ({ params }: { params: { slugId: string } }) => {
  const { slugId } = await params;
  return <SlugIdPage slugId={slugId} />;
};

export default page;
