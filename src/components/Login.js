// components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoadingEmail(true);
    setError('');
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoadingEmail(false);
        navigate('/'); // Redirect to home page
      })
      .catch((error) => {
        setError(`Login failed: ${error.message}`);
        setLoadingEmail(false);
      });
  };

  const handleGoogleLogin = () => {
    setLoadingGoogle(true);
    setError('');
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setLoadingGoogle(false);
        navigate('/'); // Redirect to home page
      })
      .catch((error) => {
        setError(`Google login failed: ${error.message}`);
        setLoadingGoogle(false);
      });
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <h2>Login to DEV@Deakin</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loadingEmail || loadingGoogle}>
          {loadingEmail ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <button onClick={handleGoogleLogin} disabled={loadingEmail || loadingGoogle} className="google-login-button">
        {loadingGoogle ? 'Logging in with Google...' : 'Login with Google'}
      </button>
      <p>Don't have an account? <button onClick={handleSignupRedirect} disabled={loadingEmail || loadingGoogle}>Create a DEV@Deakin account</button></p>
    </div>
  );
}

export default Login;
