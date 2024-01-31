import React from 'react';
import { useAuth } from './AuthContext';

const HomeUser = () => {
  const { isLoggedIn, username, logout } = useAuth();

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>Welcome, {username}!</h2>
        </div>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
};

export default HomeUser;