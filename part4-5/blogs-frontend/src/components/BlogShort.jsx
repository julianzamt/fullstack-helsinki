import { Link } from 'react-router-dom';

const BlogShort = ({ blog }) => {
  return (
    <li key={blog.id}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </li>
  );
};

export default BlogShort;
