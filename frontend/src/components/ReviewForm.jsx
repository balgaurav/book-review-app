// frontend/src/components/ReviewForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ bookId, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post(`http://localhost:3000/api/reviews`, {
        bookId,
        rating,
        comment,
      });

      // Call the parent function to update the list of books/reviews
      onReviewAdded();

      // Clear the form and collapse it
      setRating(5);
      setComment('');
      setIsExpanded(false);
    } catch (error) {
      console.error('Error adding review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isExpanded) {
    return (
      <div className="mt-4">
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 font-medium"
        >
          + Add a Review
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-green-50 rounded-lg p-4 border border-green-200">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold text-gray-800">Add a Review</h4>
        <button
          onClick={() => setIsExpanded(false)}
          className="text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating:
          </label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
          >
            <option value={5}>5 Stars - Excellent</option>
            <option value={4}>4 Stars - Very Good</option>
            <option value={3}>3 Stars - Good</option>
            <option value={2}>2 Stars - Fair</option>
            <option value={1}>1 Star - Poor</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comment:
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 resize-none"
            placeholder="Share your thoughts about this book..."
          />
        </div>
        
        <div className="flex space-x-3">
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 font-medium ${
              isSubmitting 
                ? 'bg-green-400 text-white cursor-not-allowed' 
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            disabled={isSubmitting}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;