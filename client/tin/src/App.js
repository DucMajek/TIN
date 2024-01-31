import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import AddBook from './components/book/AddBook';
import DeleteBook from './components/book/DeleteBook';
import GetBook from './components/book/GetBooks';
import GetById from './components/book/GetById';
import UpdateBook from './components/book/UpdateBook';


import GetBorrows from './components/borrow/GetBorrows';
import  GetBorrowById  from './components/borrow/GetBorrowById';
import  AddBorrow  from './components/borrow/AddBorrow';
import  DeleteBorrow  from './components/borrow/DeleteBorrow';
import  UpdateBorrow  from './components/borrow/UpdateBorrow';

import GetReaders from './components/reader/GetReader';
import GetReaderById from './components/reader/GetReaderById';
import AddReader from './components/reader/AddReader';
import DeleteReader from './components/reader/DeleteReader';
import UpdateReader from './components/reader/UpdateReader';

import GetUsers from './components/user/GetUser';
import GetUserById from './components/user/GetUserById';
import AddUser from './components/user/AddUser';
import DeleteUser from './components/user/DeleteUser';
import UpdateUser from './components/user/UpdateUser';

import Signup from './components/account/Signup';
import Login from './components/account/Login';
import HomeUser from './components/account/HomeUser';
import LogoutButton from './components/account/LogoutButton';

import { AuthProvider } from './components/account/AuthContext';


const App = () => {
  return (
    <AuthProvider>
    <Router>
      <div className='container'>
        <nav>
        <div className='BookReader'>

        <h3><strong>Book</strong></h3>
          <ul>
            <li>
              <Link to="/getBooks">Get Books</Link>
            </li>
            <li>
              <Link to="/fetchBookById">GetBooksById</Link>
            </li>
            <li>
              <Link to="/addBook">Add book</Link>
            </li>
            <li>
              <Link to="/deleteBook">Delete book</Link>
            </li>
            <li>
              <Link to="/updateBook">Update book</Link>
            </li>
            </ul>

            <h3><strong>Readers</strong></h3>
            <ul>
              <li>
              <Link to="/getReaders">Get Readers</Link>
            </li>
            <li>
              <Link to="/fetchReaderById">GetReaderById</Link>
            </li>
            <li>
              <Link to="/AddReader">Add reader</Link>
            </li>
            <li>
              <Link to="/DeleteReader">Delete reader</Link>
            </li>
            <li>
              <Link to="/UpdateReader">Update reader</Link>
            </li>
            </ul>
        </div>
        
        <div className='BorrowUser'>
        <h3><strong>Borrow</strong></h3>
            <ul>
            <li>
              <Link to="/getBorrows">Get Borrows</Link>
            </li>
            <li>
              <Link to="/fetchBorrowById">GetBorrowById</Link>
            </li>
            <li>
              <Link to="/AddBorrow">Add borrow</Link>
            </li>
            <li>
              <Link to="/DeleteBorrow">Delete borrow</Link>
            </li>
            <li>
              <Link to="/UpdateBorrow">Update borrow</Link>
            </li>
          </ul>

          <h3><strong>Users</strong></h3>
            <ul>
            <li>
              <Link to="/getUsers">Get User</Link>
            </li>
            <li>
              <Link to="/fetchUserById">GetUserById</Link>
            </li>
            <li>
              <Link to="/AddUser">Add user</Link>
            </li>
            <li>
              <Link to="/DeleteUser">Delete user</Link>
            </li>
            <li>
              <Link to="/UpdateUser">Update user</Link>
            </li>
            </ul>

        </div>

        <div className='account'>
        <h3><strong>Account</strong></h3>
            <ul>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            </ul>

        </div>
           
        </nav>
        <div>
            <LogoutButton />
        </div>
      
        <Routes>
          {/*books*/}
          <Route path="/getBooks" element={<GetBook />} />
          <Route path="/fetchBookById" element={<GetById />} />
          <Route path="/addBook" element={<AddBook />} />
          <Route path="/deleteBook" element={<DeleteBook />} />
          <Route path="/updateBook" element={<UpdateBook />} />
        
          {/*Borrows*/}
          <Route path="/getBorrows" element={<GetBorrows />} />
          <Route path="/fetchBorrowById" element={<GetBorrowById />} />
          <Route path="/AddBorrow" element={<AddBorrow />} />
          <Route path="/DeleteBorrow" element={<DeleteBorrow />} />
          <Route path="/UpdateBorrow" element={<UpdateBorrow />} />

          {/* readers */}
          <Route path="/getReaders" element={<GetReaders />} />
          <Route path="/fetchReaderById" element={<GetReaderById />} />
          <Route path="/AddReader" element={<AddReader />} />
          <Route path="/DeleteReader" element={<DeleteReader />} />
          <Route path="/UpdateReader" element={<UpdateReader />} />

          {/* users */}
          <Route path="/getUsers" element={<GetUsers />} />
          <Route path="/fetchUserById" element={<GetUserById />} />
          <Route path="/AddUser" element={<AddUser />} />
          <Route path="/DeleteUser" element={<DeleteUser />} />
          <Route path="/UpdateUser" element={<UpdateUser />} />


          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/homeUser" element={<HomeUser />} />
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
};


export default App;
