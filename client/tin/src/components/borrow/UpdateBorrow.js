import React, { useState, useEffect } from 'react';
import '../StylePost.css';
import { useAuth } from '../account/AuthContext';
import ListBorrow from './ListBorrow';
import Paginate from '../Paginate';
export default function UpdateBorrow() {
    const [_id, setId] = useState('');
    const [bookId, setBookId] = useState("");
    const [readerId, setReaderId] = useState("");
    const [borrowDate, setBorrowDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [status, setStatus] = useState("");
    const { isLoggedIn } = useAuth();
    const [loginError, setLoginError] = useState("");
    const [selectedStatus, setSelectedStatus] = useState('');
    const statuses = ['Borrow', 'Waiting for Borrow'];

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(2);
    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [message, setMessage] = useState("");
    useEffect(() => {
        fetch('http://localhost:5000/api/getAllBorrows')
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
        try {
            if(_id === null || _id === '')
                alert('Id is empty');
            
            const updatedData = {};
            if (bookId) updatedData.bookId = bookId;
            if (readerId) updatedData.readerId = readerId;
            if (borrowDate) updatedData.borrowDate = borrowDate;
            if (returnDate) updatedData.returnDate = returnDate;
            if (selectedStatus) updatedData.status = selectedStatus;
            const response = await fetch(`http://localhost:5000/api/updateBorrow/${_id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedData),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setMessage('Updated')
            setId("")
            setBookId("");
            setReaderId("");
            setBorrowDate("");
            setReturnDate("");
            setSelectedStatus("");

            const result = await response.json();
            console.log(result);
        } catch (error) {
          setMessage("Update failed")
            console.error('Error :', error);
        }
    }
    

    return (
        <div className='container'>
            {loginError && <p>{loginError}</p>}
            {message && <p>{message}</p>}
            <form onSubmit={collectData}>
                <h2 className='text-center'>Update Borrow</h2>
                <div className='mb-3'>
                    <label className='form-label'>Id</label>
                    <br />
                    <input type='text' className='form-control' placeholder='field can not be empty'
                        value={_id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Book Id</label>
                    <br />
                    <input type='text' className='form-control'
                        value={bookId}
                        onChange={(e) => setBookId(e.target.value)}
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Reader Id</label>
                    <br />
                    <input type='text' className='form-control'
                        value={readerId}
                        onChange={(e) => setReaderId(e.target.value)}
                    />
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
                <button type='submit' className='btn'>Update</button>
            </form>
            <ul>
          {currentPosts.map(item => (
            <ListBorrow key={item.id} item={item} />
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
