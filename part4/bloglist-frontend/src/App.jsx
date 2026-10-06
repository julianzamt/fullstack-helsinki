import { useState, useEffect } from 'react';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import UserInfo from './components/UserInfo';
import blogService from './services/blogs';
import loginService from './services/login';
import Login from './components/Login';
import Feedback from './components/Feedback';
import { ERR, SUCCESS } from './constants';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [feedback, setFeedback] = useState(null);

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
    const user = window.localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setUser(parsedUser);
      blogService.setToken(parsedUser.token);
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

  return (
    <>
      {feedback && <Feedback feedback={feedback} />}
      {!user && <Login onLogin={handleLogin} />}
      {user && (
        <div>
          <h2>Blogs</h2>
          <UserInfo user={user} onLogout={handleLogout} />
          <br></br>
          <BlogList blogs={blogs} />
          <br></br>
          <BlogForm createBlog={createBlog} />
        </div>
      )}
    </>
  );
};

export default App;
