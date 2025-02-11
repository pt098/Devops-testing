// components/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import './signup.css';

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setLoadingEmail(true);
    setError('');
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoadingEmail(false);
        navigate('/login'); // Redirect to login page
      })
      .catch((error) => {
        setError(`Signup failed: ${error.message}`);
        setLoadingEmail(false);
      });
  };

  const handleGoogleSignup = () => {
    setLoadingGoogle(true);
    setError('');
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setLoadingGoogle(false);
        navigate('/login'); // Redirect to login page
      })
      .catch((error) => {
        setError(`Google sign-up failed: ${error.message}`);
        setLoadingGoogle(false);
      });
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <h2>Create a DEV@Deakin Account</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignup}>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          required
        />
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
          {loadingEmail ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
      <button onClick={handleGoogleSignup} disabled={loadingEmail || loadingGoogle} className="google-signup-button">
        {loadingGoogle ? 'Signing up with Google...' : 'Sign up with Google'}
      </button>
      <p>Already have an account? <button onClick={handleLoginRedirect} disabled={loadingEmail || loadingGoogle}>Login</button></p>
    </div>
  );
}

export default Signup;
