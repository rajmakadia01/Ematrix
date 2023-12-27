import React, { useContext, useState } from 'react';
import { AuthContext } from './App';
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Login = () => {
  const { setLoggedIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === 'user@example.com' && password === 'password') {
      setLoggedIn(true);
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="LoginPage">
    <div className="LoginBox">
      <h2>Login</h2>
      <form className="LoginForm">
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  </div>
  );
};

export default Login;
