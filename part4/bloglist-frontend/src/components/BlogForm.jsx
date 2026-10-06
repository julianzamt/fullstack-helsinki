import { useState } from 'react';

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
      <h2>Create New</h2>
      <form onSubmit={handleSubmit}>
        <label>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          ></input>
        </label>
        <label>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </label>
        <label>
          url
          <input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          ></input>
        </label>
        <br></br>
        <button>Submit</button>
      </form>
    </>
  );
};

export default BlogForm;
