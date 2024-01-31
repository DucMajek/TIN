const mongoose = require('mongoose');
const { Book, Reader, Borrow, UserReader } = require('./models/modelSchema');

mongoose.connect('mongodb://localhost:27017/biblioteka', { useNewUrlParser: true, useUnifiedTopology: true });

// Wprowadzenie danych do Książek
const book1 = new Book({ id: 0, title: 'Wiedźmin', author: 'Andrzej Sapkowski', publicationYear: 1993, genre: 'Fantasy' });
const book2 = new Book({ id: 1, title: 'Duma i uprzedzenie', author: 'Jane Austen', publicationYear: 1813, genre: 'Romans' });

// Uzytkownicy
const user1 = new UserReader({ login: "kowal", password: 'kowal123' });
const user2 = new UserReader({ login: "nowak", password: 'nowak123' });

// Wprowadzenie danych do Czytelników
const reader1 = new Reader({ id: 0, name: 'Jan', surname: 'Kowalski', birthDate: new Date('1990-01-01'), userId: user1._id });
const reader2 = new Reader({ id: 1, name: 'Anna', surname: 'Nowak', birthDate: new Date('1985-05-15'), userId: user2._id });

// Wprowadzenie danych do Wypożyczeń
const borrow1 = new Borrow({ id: 0, bookId: book1._id, readerId: reader1._id, borrowDate: new Date(), returnDate: new Date('2023-01-15'), status: 'Wypożyczona' });
const borrow2 = new Borrow({ id: 1, bookId: book2._id, readerId: reader2._id, borrowDate: new Date(), returnDate: new Date('2023-02-01'), status: 'Wypożyczona' });

// Zapisanie danych do bazy danych
async function saveData() {
  await book1.save();
  await book2.save();
  await user1.save();
  await user2.save();
  await reader1.save();
  await reader2.save();
  await borrow1.save();
  await borrow2.save();
  console.log('Dane zostały wprowadzone do bazy danych.');
}

saveData();
