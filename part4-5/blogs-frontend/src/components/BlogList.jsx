import BlogShort from './BlogShort';

const BlogList = ({ blogs }) => {
  return (
    <ul>
      {blogs.map((blog) => (
        <BlogShort key={blog.id} blog={blog} />
      ))}
    </ul>
  );
};

export default BlogList;
