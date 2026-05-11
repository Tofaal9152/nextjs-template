import BlogForm from "./components/blog-form";

const BlogIndex = () => {
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold mb-4">Create a New Blog Post</h1>
        <p className="text-gray-600 mb-6">
          Use the form below to create a new blog post. Fill in the title and
          content, then submit to publish your post.
        </p>
      </div>
      <BlogForm />
    </div>
  );
};

export default BlogIndex;
