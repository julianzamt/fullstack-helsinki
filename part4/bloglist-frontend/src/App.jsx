import { useState, useEffect, useRef } from 'react';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import UserInfo from './components/UserInfo';
import blogService from './services/blogs';
import loginService from './services/login';
import Login from './components/Login';
import Feedback from './components/Feedback';
import Togglable from './components/Togglable';
import { ERR, SUCCESS } from './constants';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const blogFormToggleRef = useRef();

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
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

      blogFormToggleRef.current.toggleVisibility();
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
        current.map((b) =>
          b.id === blog.id ? { ...b, likes: updated.likes } : b,
        ),
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

  return (
    <>
      {feedback && <Feedback feedback={feedback} />}
      {!user && <Login onLogin={handleLogin} />}
      {user && (
        <div>
          <h2>Blogs</h2>
          <UserInfo user={user} onLogout={handleLogout} />
          <br></br>
          <BlogList blogs={blogs} likeBlog={likeBlog} />
          <br></br>
          <Togglable buttonLabel={'Add new blog'} ref={blogFormToggleRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
        </div>
      )}
    </>
  );
};

export default App;
