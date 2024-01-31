import React, { useState } from 'react';
import '../StylePost.css';
import { useAuth } from '../account/AuthContext';

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [genre, setGenre] = useState("");
  const { isLoggedIn } = useAuth();
  const [loginError, setLoginError] = useState("");
  const [selectedGenre, setSelectedGenre] = useState('');
  const genres = ['Science Fiction', 'Fantasy', 'Mystery', 'Thriller', 'Romance', 'Non-fiction', 'Historical Fiction'];
  const [message, setMessage] = useState("");
  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    console.log(selectedGenre);
  };
  const collectData = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
        console.error('User not logged in. Cannot add book.');
        const message = 'Access only for users site';
        setLoginError(message);
        return;
      }
      if (!title || !author || !publicationYear || !selectedGenre) {
        setMessage('Please fill in all fields.');
        return;
      }

    try {
      const response = await fetch('http://localhost:5000/api/addBook', {
        method: 'POST',
        body: JSON.stringify({ title, author, publicationYear, genre: selectedGenre }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setMessage('Added');
      setTitle("");
      setAuthor("");
      setPublicationYear("");
      setGenre("");
      setLoginError("");

      const result = await response.json();
      console.log(result + selectedGenre);
    } catch (error) {
      setMessage('Add failed');
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className='container'>
      {loginError && <p>{loginError}</p>}
      {message && <p>{message}</p>}
      <form onSubmit={collectData}>
        <h2 className='text-center'>Add Book</h2>
        <div className='mb-3'>
          <label className='form-label'>Title</label>
          <br />
          <input
            type='text'
            className='form-control'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className='mb-3'>
          <label className='form-label'>Author</label>
          <br />
          <input
            type='text'
            className='form-control'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div className='mb-3'>
          <label className='form-label'>Publication Year</label>
          <br />
          <input
            type='number'
            className='form-control'
            value={publicationYear}
            onChange={(e) => setPublicationYear(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="genre">Select Genre:</label>
          <select
            id="genre"
            className="form-control"
            value={selectedGenre}
            onChange={handleGenreChange}
          >
            <option value="" disabled>Select a genre</option>
            {genres.map((genreOption, index) => (
              <option key={index} value={genreOption}>{genreOption}</option>
            ))}
          </select>
        </div>
        <button type='submit' className='btn'>
          Add
        </button>
      </form>
    </div>
  );
}
