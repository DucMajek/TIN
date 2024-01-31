import React, { useState, useEffect } from 'react';
import '../StylePost.css';
import { useAuth } from '../account/AuthContext';
import Paginate from '../Paginate';
import ListUsers from './ListUsers';
export default function DeleteUser() {
    const [deleteId, setDeleteId] = useState(""); 
    const { isLoggedIn } = useAuth();
    const [loginError, setLoginError] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [message, setMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(2);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/getAllUsers')
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
    const handleDelete = async () => {
        try {
            await collectData(deleteId);

        } catch (error) {
            console.error('Error handling delete:', error);
        }
    }

    const collectData = async () => {
        if (!isLoggedIn) {
            console.error('User not logged in. Cannot add user.');
            const message = 'Access only for users site';
            setLoginError(message);
            return;
          }
        try {
            const response = await fetch(`http://localhost:5000/api/deleteUser/${deleteId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setMessage('Deleted');
            setDeleteId("");
            const result = await response.json();
            console.log(result);
           
        } catch (error) {
            setMessage('Delete failed');
            console.error('Error deleting borrow:', error);
        }
    }
    

   

    return (
        <div className='container'>
            {loginError && <p>{loginError}</p>}
            {message && <p>{message}</p>}
            <form onSubmit={(e) => e.preventDefault()}>
                <h2 className='text-center'>Delete User</h2>
                <div className='mb-3'>
                    <label className='form-label'>User ID to Delete</label>
                    <br />
                    <input
                        type='text'
                        className='form-control'
                        value={deleteId}
                        onChange={(e) => setDeleteId(e.target.value)}
                    />
                </div>
                <button type='button' onClick={handleDelete}  className='btn'>
                    Delete
                </button>
            </form>
            <ul>
          {currentPosts.map(item => (
            <ListUsers key={item.id} item={item} />
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
