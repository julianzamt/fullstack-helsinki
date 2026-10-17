import { useState } from 'react';

const Blog = ({ blog, likeBlog, user, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} data-testid="blog">
      {blog.title} {blog.author}
      <br></br>
      <button
        onClick={() => deleteBlog(blog)}
        style={{ display: user.id === blog.user.id ? '' : 'none' }}
      >
        Delete
      </button>
      <br></br>
      <button
        style={{ display: showDetails ? 'none' : '' }}
        onClick={() => setShowDetails(true)}
      >
        Show details
      </button>
      <div style={{ display: showDetails ? '' : 'none' }}>
        <p>{blog.url}</p>
        <p data-testid="blog-likes">
          {blog.likes} <button onClick={() => likeBlog(blog)}>Like</button>
        </p>
        <p>{blog.user.name}</p>
        <button onClick={() => setShowDetails(false)}>Hide details</button>
      </div>
    </div>
  );
};

export default Blog;
