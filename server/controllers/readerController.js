const { ObjectId } = require('mongodb');
const { Reader } = require('../models/modelSchema');
const mongoose = require('mongoose');
let database;

const setDatabase = (db) => {
  database = db;
  console.log("Database set in controller");
};

const getReaderById = async (req, res) => {
  const { _id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: 'Invalid reader ID' });
    }

    const reader = await Reader.findById(_id).lean().exec();

    if (reader) {
      res.status(200).json(reader);
    } else {
      res.status(404).json({ message: 'Reader not found' });
    }
  } catch (err) {
    console.error('Error fetching reader:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getReaders = async (req, res) => {
  try {
    const readers = await Reader.find({}).lean().exec();
    res.json(readers);
  } catch (error) {
    console.error("Error fetching reader:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const addReader = async (req, res) => {
  try {
    const { name, surname, birthDate, userId } = req.body;

    const newReader = new Reader({
        name,
        surname,
        birthDate,
        userId
    });

    await newReader.save();
    res.json("Added");
  } catch (error) {
    console.error("Error adding reader:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteReader = async (req, res) => {
  try {
    const readerId = req.params._id;

    const result = await Reader.deleteOne({ _id: readerId });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Cannot find reader or no deletions were made' });
    } else {
      res.json("Deleted");
    }
  } catch (error) {
    console.error("Error deleting reader:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateReader = async (req, res) => {
  try {
    const readerId = req.params;
    const updateData = await Reader.findByIdAndUpdate(readerId, req.body);

    if(!updateData){
      return res.status(404).json({message: 'Cannot find readerId or no modifications were made'})
    }
    const updatedBook = await Reader.findById(readerId);

    res.status(200).json(updatedBook)
    }catch (error) {
    console.error("Error updating reader:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { setDatabase, getReaders, getReaderById, deleteReader, updateReader, addReader };
