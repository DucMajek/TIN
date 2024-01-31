import React from 'react';
import './Style.css';
import { useAuth } from './AuthContext';

const HomeUserLogoutButton = () => {
  const { isLoggedIn, logout } = useAuth();

  return isLoggedIn ? (
    <div>
      <button className='logoutBtn' onClick={logout}>Logout</button>
    </div>
  ) : null;
};

export default HomeUserLogoutButton;