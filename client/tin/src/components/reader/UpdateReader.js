import React, { useState, useEffect } from 'react';
import '../StylePost.css';
import { useAuth } from '../account/AuthContext';
import ListReader from './ListReader';
import Paginate from '../Paginate';
export default function UpdateReader() {
    const [_id, setId] = useState('');
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const { isLoggedIn } = useAuth();
    const [loginError, setLoginError] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [message, setMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(2);
    const [items, setItems] = useState([]);
    const handleDate = (e) => {
        setBirthDate(e.target.value);
      };

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
    const collectData = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            console.error('User not logged in. Cannot add reader.');
            const message = 'Access only for users site';
            setLoginError(message);
            return;
          }
        try {
            if(_id === null || _id === '')
                alert('Id is empty');
            
            const updatedData = {};
            if (name) updatedData.name = name;
            if (surname) updatedData.surname = surname;
            if (birthDate) updatedData.birthDate = birthDate;
            const response = await fetch(`http://localhost:5000/api/updateReader/${_id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedData),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setMessage('Updated')
            setId("")
            setName("");
            setSurname("");
            setBirthDate("");
            const result = await response.json();
            console.log(result);
        } catch (error) {
            setMessage('Update failed')
            console.error('Error :', error);
        }
    }


    return (
        <div className='container'>
            {loginError && <p>{loginError}</p>}
            {message && <p>{message}</p>}
            <form onSubmit={collectData}>
                <h2 className='text-center'>Update Reader</h2>
                <div className='mb-3'>
                    <label className='form-label'>Id</label>
                    <br />
                    <input type='text' className='form-control' placeholder='field can not be empty'
                        value={_id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>
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
                <button type='submit'  className='btn'>Update</button>
            </form>
            <h1>List of Readers</h1>
        <ul>
          {currentPosts.map(item => (
            <ListReader key={item.id} item={item} />
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
