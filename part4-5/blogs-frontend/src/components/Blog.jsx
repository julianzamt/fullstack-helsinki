import { useParams } from 'react-router-dom';

const Blog = ({ blogs, likeBlog, user, deleteBlog }) => {
  const id = useParams().id;

  const blog = blogs.find((b) => b.id === id);

  if (!blog) return null;

  return (
    <div>
      <h1>
        {blog.author}: {blog.title}
      </h1>
      <p>{blog.url}</p>
      <p data-testid="blog-likes">
        {blog.likes}{' '}
        {user && <button onClick={() => likeBlog(blog)}>Like</button>}
        {!user && <span> Likes </span>}
      </p>
      <p>{blog.user.name}</p>
      <button
        onClick={() => deleteBlog(blog)}
        style={{
          display: user?.id === blog.user.id ? '' : 'none',
          margin: 5,
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default Blog;
