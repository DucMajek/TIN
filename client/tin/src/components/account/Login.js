import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Style.css';
import { useAuth } from './AuthContext';
export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!login || !password) {
      setMessage('Please fill in all fields.');
      return;
    }

    axios.post('http://localhost:5000/api/login', { login, password })
      .then(result => {
        console.log(result);
        if (result.data === 'Success') {
          authLogin(login);
          navigate('/homeUser');
        }
      })
      .catch(err => {console.log(err);
      setMessage('Login failed. Please try again.')});
  }

  return (
    <div className="container">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Login</strong>
              <br />
            </label>
            <input
              type="text"
              placeholder="Enter login"
              autoComplete="off"
              name="login"
              className="form-control rounded-0"
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit' className="styledBtn">Log in</button>
        </form>
        {message && <p>{message}</p>}
        <Link to='/register' className="styledBtn2"><p>Create new Account</p></Link>
      </div>
    </div>
    
  )
}
