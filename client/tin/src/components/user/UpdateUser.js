import React, { useState, useEffect } from 'react';
import '../StylePost.css';
import { useAuth } from '../account/AuthContext';
import Paginate from '../Paginate';
import ListUsers from './ListUsers';
export default function UpdateUser() {
    const [_id, setId] = useState('');
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
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
    const collectData = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            console.error('User not logged in. Cannot add user.');
            const message = 'Access only for users site';
            setLoginError(message);
            return;
          }
        try {
            if(_id === null || _id === '')
                alert('Id is empty');
            
            const updatedData = {};
            if (login) updatedData.login = login;
            if (password) updatedData.password = password;
            const response = await fetch(`http://localhost:5000/api/updateUser/${_id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedData),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setMessage("Updated");
            setLogin("");
            setPassword("");

            const result = await response.json();
            console.log(result);
        } catch (error) {
            setMessage("Update failed");
            console.error('Error :', error);
        }
    }
 

    return (
        <div className='container'>
            {loginError && <p>{loginError}</p>}
            {message && <p>{message}</p>}
            <form onSubmit={collectData}>
                <h2 className='text-center'>Update User</h2>
                <div className='mb-3'>
                    <label className='form-label'>Id</label>
                    <br />
                    <input type='text' className='form-control' placeholder='field can not be empty'
                        value={_id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>
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

                <button type='submit'  className='btn'>Update</button>
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
