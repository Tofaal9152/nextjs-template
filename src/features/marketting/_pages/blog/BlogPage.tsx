import TrainAtHomeForm from "./TrainAtHomeForm";

const BlogPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Blog Page</h1>
      <p className="text-gray-700 mb-6">
        Welcome to our blog! Here you&apos;ll find the latest news, tips, and
        insights on fitness, health, and wellness. Stay tuned for regular
        updates and expert advice to help you achieve your fitness goals.
      </p>

      <TrainAtHomeForm />
    </div>
  );
};

export default BlogPage;
