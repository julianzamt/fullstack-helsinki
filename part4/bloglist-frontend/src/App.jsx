import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const user = window.localStorage.getItem('user');
    if (user) setUser(JSON.parse(user));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await loginService.login({ username, password });

    window.localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    setUsername('');
    setPassword('');
  };

  const handleLogout = () => {
    window.localStorage.setItem('user', null);
    setUser(null);
  };

  const login = (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          ></input>
        </label>
        <label>
          password
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          ></input>
        </label>
        <br></br>
        <button>Login</button>
      </form>
    </div>
  );

  const blogsBlock = (
    <div>
      <h2>blogs</h2>
      {user?.name} is logged in
      <br></br>
      <br></br>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );

  return (
    <>
      {!user && login} {user && blogsBlock}
    </>
  );
};

export default App;
