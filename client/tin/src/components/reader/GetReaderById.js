import React, { useState, useEffect } from 'react';
import '../StylePost.css';
export default function GetReaderById() {
  const [_id, setId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [items, setItems] = useState([]);

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

  const handleGenreChange = (e) => {
    setSelectedId(e.target.value);
    setId(e.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/getReader/${_id}`);
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
      <div className='mb-3'>
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
          <p>Name: {result.name}</p>
          <p>Surname: {result.surname}</p>
          <p>BirthDate: {result.birthDate}</p>
        </div>
      )}
    </div>
  );
}
