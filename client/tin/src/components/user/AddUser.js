import React, { useState } from 'react';
import '../StylePost.css';
import { useAuth } from '../account/AuthContext';
export default function AddUser() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const { isLoggedIn } = useAuth();
    const [loginError, setLoginError] = useState("");
    const [message, setMessage] = useState("");
    const collectData = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            console.error('User not logged in. Cannot add user.');
            const message = 'Access only for users site';
            setLoginError(message);
            return;
          }
          if (!login || !password) {
            setMessage('Please fill in all fields.');
            return;
          }
        try {
            const response = await fetch('http://localhost:5000/api/addUser', {
                method: 'POST',
                body: JSON.stringify({ login, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setMessage("Added");
            setLogin("");
            setPassword("");

            const result = await response.json();
            console.log(result);
        } catch (error) {
            setMessage("Add failed");
            console.error('Error adding user:', error);
        }
    }
    

    return (
        <div className='container'>
            {loginError && <p>{loginError}</p>}
            {message && <p>{message}</p>}
            <form onSubmit={collectData}>
                <h2 className='text-center'>Add user</h2>
                <div className='mb-3'>
                    <label className='form-label'>Login</label>
                    <br />
                    <input type='text' className='form-control'
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Password</label>
                    <br />
                    <input type='text' className='form-control'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type='submit' className='btn'>Add</button>
            </form>
        </div>
    );
}
