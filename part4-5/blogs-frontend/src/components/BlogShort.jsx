import { Link } from 'react-router-dom';
import { TableCell, TableRow } from '@mui/material';

const BlogShort = ({ blog }) => {
  return (
    <TableRow>
      <TableCell>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </TableCell>
      <TableCell>{blog.author}</TableCell>
    </TableRow>
  );
};

export default BlogShort;
