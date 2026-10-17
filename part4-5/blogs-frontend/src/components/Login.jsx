import { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await onLogin({ username, password });
    if (success) {
      setUsername('');
      setPassword('');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
};

export default Login;
