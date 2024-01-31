import React, { useState, useEffect } from 'react';
import '../StylePost.css';
import { useAuth } from '../account/AuthContext';

export default function AddBorrow() {
    const [bookId, setBookId] = useState("");
    const [readerId, setReaderId] = useState("");
    const [readerName, setReaderName] = useState("");
    const [borrowDate, setBorrowDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [status, setStatus] = useState("");
    const { isLoggedIn } = useAuth();
    const [loginError, setLoginError] = useState("");
    const [selectedStatus, setSelectedStatus] = useState('');
    const statuses = ['Borrow', 'Waiting for Borrow'];
    const [message, setMessage] = useState("");
    const [items, setItems] = useState([]);
    const [Book, setBook] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoadedBook, setIsLoadedBook] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/api/getAllReaders')
            .then(response => response.json())
            .then(json => {
                setItems(json);
                setIsLoaded(true);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoaded(true);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/api/getAllBooks')
            .then(response => response.json())
            .then(json => {
                setBook(json);
                setIsLoadedBook(true);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoaded(true);
            });
    }, []);

    const handleBookNameChange = (e) => {
        setBookId(e.target.value);
    };

    const handleReaderNameChange = (e) => {
        setReaderId(e.target.value);
    };

    const handleDateChange = (e) => {
        setReturnDate(e.target.value);
    };

    const handleDateChange2 = (e) => {
        setBorrowDate(e.target.value);
    };

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const collectData = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            console.error('User not logged in. Cannot add borrow.');
            const message = 'Access only for users site';
            setLoginError(message);
            return;
        }

        if (!bookId || !readerId || !borrowDate || !returnDate || !selectedStatus) {
            setMessage('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/addBorrow', {
                method: 'POST',
                body: JSON.stringify({ bookId, readerId, borrowDate, returnDate, status: selectedStatus }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setMessage("Added");
            setBookId("");
            setReaderId("");
            setBorrowDate("");
            setReturnDate("");
            setStatus("");

            const result = await response.json();
            console.log(result);
        } catch (error) {
            setMessage("Add failed")
            console.error('Error adding book:', error);
        }
    };

    return (
        <div className='container'>
            {loginError && <p>{loginError}</p>}
            {message && <p>{message}</p>}
            <form onSubmit={collectData}>
                <h2 className='text-center'>Add Borrow</h2>
                <div className='mb-3'>
                    <label htmlFor="genre">Select book name:</label>
                    <select
                        id="genre"
                        className="form-control"
                        value={bookId}
                        onChange={handleBookNameChange}
                    >
                        <option value="" disabled>Select a title</option>
                        {Book.map((item, index) => (
                            <option key={index} value={item._id}>{item.title}</option>
                        ))}
                    </select>
                </div>

                <div className='mb-3'>
                    <label htmlFor="genre">Select readerName:</label>
                    <select
                        id="genre"
                        className="form-control"
                        value={readerId}
                        onChange={handleReaderNameChange}
                    >
                        <option value="" disabled>Select a id</option>
                        {items.map((item, index) => (
                            <option key={index} value={item._id}>{item.name}</option>
                        ))}
                    </select>
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Borrow Date</label>
                    <br />
                    <input type='date'
                        className='form-control'
                        value={borrowDate}
                        onChange={handleDateChange2}
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>return Date</label>
                    <br />
                    <input type='date'
                        className='form-control'
                        value={returnDate}
                        onChange={handleDateChange}
                    />
                </div>

                <div>
                    <label htmlFor="genre">Select Status:</label>
                    <select
                        id="status"
                        className="form-control"
                        value={selectedStatus}
                        onChange={handleStatusChange}
                    >
                        <option value="" disabled>Select a Status</option>
                        {statuses.map((statusOption, index) => (
                            <option key={index} value={statusOption}>{statusOption}</option>
                        ))}
                    </select>
                </div>

                <button type='submit' className='btn'>Add</button>
            </form>
        </div>
    );
}
