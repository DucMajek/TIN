import React, { useState, useEffect } from 'react';
import '../StylePost.css';
import { useAuth } from '../account/AuthContext';
import ListBooks from './ListBooks';
import Paginate from '../Paginate';
export default function UpdateBook() {
    const [_id, setId] = useState('');
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publicationYear, setPublicationYear] = useState("");
    const [genre, setGenre] = useState("");
    const { isLoggedIn } = useAuth();
    const [loginError, setLoginError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(2);
    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [message, setMessage] = useState("");
    const [selectedGenre, setSelectedGenre] = useState('');
    const genres = ['Science Fiction', 'Fantasy', 'Mystery', 'Thriller', 'Romance', 'Non-fiction', 'Historical Fiction'];

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    setGenre(e.target.value);
  };
    const collectData = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            console.error('User not logged in. Cannot update book.');
            const message = 'Access only for users site';
            setLoginError(message);
            return;
          }
        try {
            if(_id === null || _id === ''){
                alert('id is empty');
            }
                 

            const updatedData = {};
            if (title) updatedData.title = title;
            if (author) updatedData.author = author;
            if (publicationYear) updatedData.publicationYear = publicationYear;
            if (selectedGenre) updatedData.genre = selectedGenre; 
            const response = await fetch(`http://localhost:5000/api/updateBook/${_id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedData),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setMessage('Updated');
            setId("")
            setTitle("");
            setAuthor("");
            setPublicationYear("");
            setGenre("");
            setLoginError("");

            const result = await response.json();
            console.log(result);


        
        } catch (error) {
            console.error('Error :', error);
            setMessage('Update failed'); 
        }
    }

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
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);
  
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    const previousPage = () => {
      if (currentPage !== 1) {
         setCurrentPage(currentPage - 1);
      }
   };
  
   const nextPage = () => {
      if (currentPage !== Math.ceil(items.length / postsPerPage)) {
         setCurrentPage(currentPage + 1);
      }
    };
   

    return (
        <div className='container'>
             {loginError && <p>{loginError}</p>}
             {message && <p>{message}</p>}
            <form onSubmit={collectData}>
                <h2 className='text-center'>Update Book</h2>
                <div className='mb-3'>
                    <label className='form-label'>Id</label>
                    <br />
                    <input type='text' className='form-control' placeholder='field can not be empty'
                        value={_id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Title</label>
                    <br />
                    <input type='text' className='form-control' 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Author</label>
                    <br />
                    <input type='text' className='form-control'
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Publication Year</label>
                    <br />
                    <input type='number' className='form-control'
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
                <button type='submit' className='btn'>Update</button>
            </form>

            <ul>
          {currentPosts.map(item => (
            <ListBooks key={item.id} item={item} />
          ))}
        </ul>
        <Paginate
          postsPerPage={postsPerPage}
          totalPosts={items.length}
          paginate={paginate}
          previousPage={previousPage}
          nextPage={nextPage}
        />
        </div>
    );
}
