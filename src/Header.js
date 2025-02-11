import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './components/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null); // Reset user state
        navigate('/'); // Redirect to home page
      })
      .catch((error) => {
        console.error("Sign-out error: ", error.message);
      });
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <header>
      <div
        style={{
          padding: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#f4f4f4',
          gap: '10px',
        }}
      >
        <h1 style={{ margin: 0 }}>DEV@Deakin</h1>
        <input
          type="text"
          placeholder="Search..."
          style={{
            flex: '1',
            padding: '7px',
            fontSize: '16px',
            marginRight: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <nav style={{ display: 'flex', gap: '10px' }}>
          <Link to="/post">
            <button
              style={{
                padding: '12px 12px',
                fontSize: '16px',
                backgroundColor: '#007BFF',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Post
            </button>
          </Link>
          <Link to="/pricing">
            <button
              style={{
                padding: '12px 12px',
                fontSize: '16px',
                backgroundColor: '#007BFF',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Plans
            </button>
          </Link>
          {user ? (
            <button
              onClick={handleSignOut}
              style={{
                padding: '12px 12px',
                fontSize: '16px',
                backgroundColor: '#007BFF',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={handleLogin}
              style={{
                padding: '12px 12px',
                fontSize: '16px',
                backgroundColor: '#007BFF',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Login
            </button>
          )}
        </nav>
      </div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img
          src="https://api.reliasoftware.com/uploads/web_development_is_important_176fa0618e.jpg"
          alt="WebDevelopment"
          style={{ width: '97%', height: '500px', objectFit: 'cover', borderRadius: '8px' }}
        />
      </div>
    </header>
  );
}

export default Header;
