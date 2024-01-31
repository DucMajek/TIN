const { ObjectId } = require('mongodb');
const { Book } = require('../models/modelSchema');
const mongoose = require('mongoose');
let database;

const setDatabase = (db) => {
  database = db;
  console.log("Database set in controller");
};

const getBookById = async (req, res) => {
  const { _id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }

    const book = await Book.findById(_id).lean().exec();

    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    console.error('Error fetching book:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getBooks = async (req, res) => {
  try {
    const books = await Book.find({}).lean().exec();
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const addBook = async (req, res) => {
  try {
    const { title, author, publicationYear, genre } = req.body;

    const newBook = new Book({
      title,
      author,
      publicationYear,
      genre
    });

    await newBook.save();
    res.json("Added");
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = req.params._id;

    const result = await Book.deleteOne({ _id: bookId });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Cannot find book or no deletions were made' });
    } else {
      res.json("Deleted");
    }
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateBook = async (req, res) => {
  try {
    const bookId = req.params;
    const updateData = await Book.findByIdAndUpdate(bookId, req.body);

    if(!updateData){
      return res.status(404).json({message: 'Cannot find book or no modifications were made'})
    }
    const updatedBook = await Book.findById(bookId);

    res.status(200).json(updatedBook)
    }catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { setDatabase, getBooks, addBook, deleteBook, updateBook, getBookById };
