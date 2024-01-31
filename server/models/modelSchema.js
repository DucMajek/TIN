const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// Model dla Książek
const BookSchema = new mongoose.Schema({
  id: Number,
  title: String,
  author: String,
  publicationYear: Number,
  genre: String
});

// Model dla Czytelników
const ReaderSchema = new mongoose.Schema({
  id: Number,
  name: String,
  login: String,
  password: String,
  surname: String,
  birthDate: Date,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Model dla Wypożyczeń
const BorrowSchema = new mongoose.Schema({
  id: Number,  
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  readerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Reader' },
  borrowDate: Date,
  returnDate: Date,
  status: String
});

const UserReaderSchema  = new mongoose.Schema({
  login: String,  
  password: String,
  readerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Reader' }
});

UserReaderSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  user.password = hashedPassword;
  next();
});

const Book = mongoose.model('Book', BookSchema);
const Reader = mongoose.model('Reader', ReaderSchema);
const Borrow = mongoose.model('Borrow', BorrowSchema);
const User  = mongoose.model('UserReader', UserReaderSchema);


module.exports = { Book, Reader, Borrow, User  };
