import React, { useState, useEffect } from 'react';
import '../StylePost.css';

export default function GetById() {
  const [_id, setId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:5000/api/getAllBooks')
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

  const handleGenreChange = (e) => {
    setSelectedId(e.target.value);
    setId(e.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/getBook/${_id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Fetched data:', data);
      setResult(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setResult(null);
      setError('Error fetching data. Please try again.');
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  return (
    <div className="container">
      <label htmlFor="genre">Select id:</label>
      <select
        id="genre"
        className="form-control"
        value={selectedId}
        onChange={handleGenreChange}
      >
        <option value="" disabled>Select a id</option>
        {items.map((item, index) => (
          <option key={index} value={item._id}>{item._id}</option>
        ))}
      </select>
      <div className='mb-3'>
        <br />
        <button type='button' className='btn' onClick={handleSearch}>
          Search
        </button>
      </div>

      {error && (
        <div>
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      )}

      {result && (
        <div>
          <h2>Result:</h2>
          <p>BookId: {result._id}</p>
          <p>Title: {result.title}</p>
          <p>Author: {result.author}</p>
          <p>Publication: {result.publicationYear}</p>
          <p>Genre: {result.genre}</p>
        </div>
      )}
    </div>
  );
}
