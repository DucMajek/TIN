import React, { useState } from 'react';
import '../StylePost.css';
import { useAuth } from '../account/AuthContext';
export default function AddReader() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const { isLoggedIn } = useAuth();
    const [loginError, setLoginError] = useState("");
    const [message, setMessage] = useState("");
    const handleDate = (e) => {
        setBirthDate(e.target.value);
      };
    const collectData = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            console.error('User not logged in. Cannot add reader.');
            const message = 'Access only for users site';
            setLoginError(message);
            return;
          }

          if (!name || !surname || !birthDate) {
            setMessage('Please fill in all fields.');
            return;
          }
        try {
            const response = await fetch('http://localhost:5000/api/addReader', {
                method: 'POST',
                body: JSON.stringify({ name, surname, birthDate}),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setMessage('Added')
            setName("");
            setSurname("");
            setBirthDate("");

            const result = await response.json();
            console.log(result);
        } catch (error) {
            setMessage('Add failed')
            console.error('Error adding reader:', error);
        }
    }
    

    return (
        <div className='container'>
            {loginError && <p>{loginError}</p>}
            {message && <p>{message}</p>}
            <form onSubmit={collectData}>
                <h2 className='text-center'>Add reader</h2>
                <div className='mb-3'>
                    <label className='form-label'>Name</label>
                    <br />
                    <input type='text' className='form-control'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Surname</label>
                    <br />
                    <input type='text' className='form-control'
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>BirthDay</label>
                    <br />
                    <input type='date'
                        className='form-control'
                        value={birthDate}
                        onChange={handleDate}
                    />
                </div>

                <button type='submit' className='btn'>Add</button>
            </form>
        </div>
    );
}
