const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book', // This links the Review back to the Book model
    required: true,
  },
}, {
  timestamps: true, // This adds 'createdAt' and 'updatedAt' fields
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;