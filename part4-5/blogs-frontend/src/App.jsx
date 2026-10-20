import { useState, useEffect } from 'react';
import BlogList from './components/BlogList';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import UserInfo from './components/UserInfo';
import blogService from './services/blogs';
import loginService from './services/login';
import Login from './components/Login';
import Feedback from './components/Feedback';
import { ERR, SUCCESS } from './constants';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const navigate = useNavigate();

  const padding = {
    padding: 5,
  };

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const blogs = await blogService.getAll();
        setBlogs(blogs.sort((a, b) => b.likes - a.likes));
      } catch {
        setFeedback({
          text: 'Could not load blogs. Please try refreshing the page.',
          type: ERR,
        });
      }
    };

    loadBlogs();
  }, []);

  useEffect(() => {
    const storedUser = window.localStorage.getItem('user');
    if (!storedUser) return;

    try {
      const parsedUser = JSON.parse(storedUser);
      if (typeof parsedUser?.token !== 'string' || !parsedUser.token.trim()) {
        window.localStorage.removeItem('user');
        blogService.setToken(null);
        return;
      }

      setUser(parsedUser);
      blogService.setToken(parsedUser.token);
    } catch {
      window.localStorage.removeItem('user');
      blogService.setToken(null);
    }
  }, []);

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('user', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);

      feedbackSetter(`Login succesful`, SUCCESS);
      return true;
    } catch (error) {
      feedbackSetter(
        error.response?.status === 401
          ? 'Wrong username or password'
          : 'Could not log in. Please try again.',
        ERR,
      );
      return false;
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    blogService.setToken(null);
    setUser(null);

    feedbackSetter(`User logged out succesfully`, SUCCESS);
  };

  const createBlog = async (newBlogData) => {
    try {
      const newBlog = await blogService.create(newBlogData);
      setBlogs((current) => current.concat(newBlog));

      feedbackSetter(`${newBlogData.title} created succesfully`, SUCCESS);

      navigate('/');

      return true;
    } catch {
      feedbackSetter('Could not create the blog. Please try again.', ERR);
      return false;
    }
  };

  const feedbackSetter = (text, type) => {
    setFeedback({
      text,
      type,
    });

    setTimeout(() => {
      setFeedback(null);
    }, 3000);
  };

  const likeBlog = async (blog) => {
    try {
      const updated = await blogService.like(blog.id, {
        likes: blog.likes + 1,
      });

      setBlogs((current) =>
        current
          .map((b) => (b.id === blog.id ? { ...b, likes: updated.likes } : b))
          .sort((a, b) => b.likes - a.likes),
      );
    } catch (error) {
      console.error('Failed to like blog:', error);

      feedbackSetter(
        error.response?.status === 404
          ? 'This blog no longer exists. Please refresh the list.'
          : 'Could not like the blog. Please try again.',
        ERR,
      );
    }
  };

  const deleteBlog = async (blog) => {
    if (window.confirm(`Are you sure to delete ${blog.title}?`)) {
      try {
        await blogService.deleteBlog(blog.id);

        setBlogs((current) => current.filter((b) => b.id !== blog.id));

        navigate('/');
      } catch (error) {
        console.error('Failed to delete blog:', error);

        feedbackSetter(
          error.response?.status === 404
            ? 'This blog no longer exists. Please refresh the list.'
            : 'Could not delete the blog. Please try again.',
          ERR,
        );
      }
    }
  };

  return (
    <>
      <h1>Blogs</h1>
      <div>
        <Link style={padding} to="/">
          Home
        </Link>
        {!user && (
          <Link style={padding} to="/login">
            Login
          </Link>
        )}
        {user && (
          <Link style={padding} to="/create">
            Add Blog
          </Link>
        )}
        {user && <UserInfo user={user} onLogout={handleLogout} />}
      </div>
      <hr />
      {feedback && <Feedback feedback={feedback} />}

      <Routes>
        <Route
          path="/"
          element={
            <BlogList
              blogs={blogs}
              likeBlog={likeBlog}
              user={user}
              deleteBlog={deleteBlog}
            />
          }
        />
        <Route path="/create" element={<BlogForm createBlog={createBlog} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />}></Route>
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blogs={blogs}
              likeBlog={likeBlog}
              user={user}
              deleteBlog={deleteBlog}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
