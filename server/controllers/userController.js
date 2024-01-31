const { ObjectId } = require('mongodb');
const { User } = require('../models/modelSchema');
const mongoose = require('mongoose');
let database;
const bcrypt = require('bcrypt');
const setDatabase = (db) => {
  database = db;
  console.log("Database set in controller");
};

const getUserById = async (req, res) => {
  const { _id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findById(_id).lean().exec();

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getUsers = async (req, res) => {
  try {
    const user = await User.find({}).lean().exec();
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const addUser = async (req, res) => {
  try {
    const { login, password } = req.body;

    const newUser = new User({
        login,
        password
    });

    await newUser.save();
    res.json("Added");
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params._id;

    const result = await User.deleteOne({ _id: userId });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Cannot find user or no deletions were made' });
    } else {
      res.json("Deleted");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params;
    const updateData = req.body;

    if (updateData.password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(updateData.password, saltRounds);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'Cannot find userId or no modifications were made' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const login = async (req, res) => {
    const { login, password } = req.body;

    try {
        const user = await User.findOne({ login: login });

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                res.status(201).json('Success');
            } else {
                res.status(401).json('Incorrect password');
            }
        } else {
            res.status(404).json('Account does not exist');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json('Internal Server Error');
    }
};


  





module.exports = { setDatabase, getUsers, getUserById, deleteUser, updateUser, addUser, login };
