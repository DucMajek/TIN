const { ObjectId } = require('mongodb');
const { Borrow } = require('../models/modelSchema');
const mongoose = require('mongoose');
let database;

const setDatabase = (db) => {
  database = db;
  console.log("Database set in controller");
};

const getBorrowById = async (req, res) => {
  const { _id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: 'Invalid borrow ID' });
    }

    const borrow = await Borrow.findById(_id).lean().exec();

    if (borrow) {
      res.status(200).json(borrow);
    } else {
      res.status(404).json({ message: 'Borrow not found' });
    }
  } catch (err) {
    console.error('Error fetching borrow:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getBorrows = async (req, res) => {
  try {
    const borrow = await Borrow.find({}).lean().exec();
    res.json(borrow);
  } catch (error) {
    console.error("Error fetching borrow:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const addBorrow = async (req, res) => {
  try {
    const { bookId, readerId, returnDate,status } = req.body;

    const newBorrow = new Borrow({
        bookId,
        readerId,
        borrowDate: new Date(),
        returnDate: new Date(returnDate),
        status
    });

    await newBorrow.save();
    res.json("Added");
  } catch (error) {
    console.error("Error adding borrow:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteBorrow = async (req, res) => {
  try {
    const borrowId = req.params._id;

    const result = await Borrow.deleteOne({ _id: borrowId });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Cannot find borrowId or no deletions were made' });
    } else {
      res.json("Deleted");
    }
  } catch (error) {
    console.error("Error deleting borrow:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateBorrow = async (req, res) => {
  try {
    const borrowId = req.params;
    const updateData = await Borrow.findByIdAndUpdate(borrowId, req.body);

    if(!updateData){
      return res.status(404).json({message: 'Cannot find borrowId or no modifications were made'})
    }
    const updatedBook = await Borrow.findById(borrowId);

    res.status(200).json(updatedBook)
    }catch (error) {
    console.error("Error updating borrow:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { setDatabase, getBorrowById, getBorrows, deleteBorrow, updateBorrow, addBorrow };
