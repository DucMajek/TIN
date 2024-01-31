const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const booksController = require('./controllers/bookController');
const readerController = require('./controllers/readerController');
const borrowController = require('./controllers/borrowController');
const userController = require('./controllers/userController');

const { ObjectId } = require('mongodb');
const { Book, Reader, Borrow } = require('./models/modelSchema');

const app = express();
const PORT = 5000;
const connection_string = 'mongodb://localhost:27017/biblioteka';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(connection_string, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((db) => {
    console.log('MongoDB connected');
    booksController.setDatabase(db);
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// books
app.get('/api/getAllBooks', booksController.getBooks);
app.get('/api/getBook/:_id', booksController.getBookById);
app.post('/api/addBook', booksController.addBook);
app.delete('/api/deleteBook/:_id', booksController.deleteBook);
app.put('/api/updateBook/:_id', booksController.updateBook);


//readers
app.get('/api/getAllReaders', readerController.getReaders);
app.get('/api/getReader/:_id', readerController.getReaderById);
app.post('/api/addReader', readerController.addReader);
app.delete('/api/deleteReader/:_id', readerController.deleteReader);
app.put('/api/updateReader/:_id', readerController.updateReader);

//borrows
app.get('/api/getAllBorrows', borrowController.getBorrows);
app.get('/api/getBorrow/:_id', borrowController.getBorrowById);
app.post('/api/addBorrow', borrowController.addBorrow);
app.delete('/api/deleteBorrow/:_id', borrowController.deleteBorrow);
app.put('/api/updateBorrow/:_id', borrowController.updateBorrow);

//users
app.get('/api/getAllUsers', userController.getUsers);
app.get('/api/getUser/:_id', userController.getUserById);
app.post('/api/addUser', userController.addUser);
app.delete('/api/deleteUser/:_id', userController.deleteUser);
app.put('/api/updateUser/:_id', userController.updateUser);

app.post('/api/register', userController.addUser);

app.post('/api/login', userController.login);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

