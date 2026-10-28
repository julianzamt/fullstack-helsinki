import {
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  Typography,
} from '@mui/material';

const Blog = ({ blog, likeBlog, user, deleteBlog }) => {
  if (!blog) return null;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h1" gutterBottom>
          {blog.author}: {blog.title}
        </Typography>
        <Link href={blog.url}>{blog.url}</Link>
        <Typography data-testid="blog-likes" sx={{ my: 1 }}>
          {blog.likes}{' '}
          {user && (
            <Button size="small" variant="outlined" onClick={() => likeBlog(blog)}>
              Like
            </Button>
          )}
          {!user && <span> Likes </span>}
        </Typography>
        <Typography color="text.secondary">{blog.user.name}</Typography>
      </CardContent>
      {user?.id === blog.user.id && (
        <CardActions>
          <Button color="error" onClick={() => deleteBlog(blog)}>
            Delete
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default Blog;
