const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review', // This links the Book to the Review model
  }],
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;