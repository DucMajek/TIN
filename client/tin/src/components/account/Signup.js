import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Style.css';

export default function Signup() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!login || !password) {
      setMessage('Please fill in all fields.');
      return;
    }

    axios.post('http://localhost:5000/api/register', { login, password })
    
      .then(result => {
        console.log(result);
        navigate('/login');
      })
      .catch(err => {
        console.error('Error during registration:', err.response.data);
        setMessage('Registration failed. Please try again.');
      });
  }

  return (
           <div className="container">
      <div className="bg-white p-3 rounded w-25">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Login</strong>
              <br />
            </label>
            <input type="text"
              placeholder="Enter login"
              autoComplete="off"
              name="login"
              className="form-control rounded-0"
              onChange={(e) => setLogin(e.target.value)} />
          </div>

          <div className="mb-3">
            <label htmlFor="email">
              <strong>Password</strong>
            </label>
            <input type="password"
              placeholder="Enter password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type='submit' className="styledBtn">Register</button>
        </form>
        {message && <p>{message}</p>}
        <Link to='/login' className="styledBtn2"><p>Already have an Account</p></Link>
      </div>
    </div>
    
 
  )
}
