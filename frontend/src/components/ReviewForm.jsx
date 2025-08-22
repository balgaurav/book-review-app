// frontend/src/components/ReviewForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ bookId, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/api/reviews`, {
        bookId,
        rating,
        comment,
      });

      // Call the parent function to update the list of books/reviews
      onReviewAdded();

      // Clear the form
      setRating(5);
      setComment('');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Add a Review:</h4>
      <div>
        <label>Rating:</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;