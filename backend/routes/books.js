const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().populate('reviews'); // The .populate() method will load all reviews associated with a book
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new book
router.post('/', async (req, res) => {
  const newBook = new Book({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
  });

  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET a single book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('reviews');
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a book
router.delete('/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;