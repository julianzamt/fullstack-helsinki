import { useState } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await createBlog({ title, author, url });
    if (success) {
      setTitle('');
      setAuthor('');
      setUrl('');
    }
  };

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Add new blog
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} sx={{ maxWidth: 400 }}>
          <TextField
            id="title"
            label="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <TextField
            id="author"
            label="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <TextField
            id="url"
            label="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default BlogForm;
