const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Book = require('../models/Book');

// POST a new review for a book
router.post('/', async (req, res) => {
  const { bookId, rating, comment } = req.body;

  try {
    const newReview = new Review({
      book: bookId,
      rating,
      comment,
    });
    const savedReview = await newReview.save();

    // Link the review to the book
    const book = await Book.findById(bookId);
    book.reviews.push(savedReview._id);
    await book.save();

    res.status(201).json(savedReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;