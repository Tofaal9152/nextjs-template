const BlogDetailsDialog = ({ data }: { data: any }) => {
  return (
    <div>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
    </div>
  );
};

export default BlogDetailsDialog;
