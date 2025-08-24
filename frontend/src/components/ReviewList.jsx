// frontend/src/components/ReviewList.jsx

import React from 'react';
import StarRating from './StarRating';

const ReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <p className="text-gray-500 text-center">No reviews yet. Be the first to add one!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h4 className="text-lg font-semibold text-gray-800 mb-3">Reviews ({reviews.length})</h4>
      {reviews.map((review) => (
        <div key={review._id} className="bg-gray-100 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <StarRating rating={review.rating} />
            <span className="text-xs text-gray-500">
              {new Date().toLocaleDateString()} {/* You can replace this with actual review date if available */}
            </span>
          </div>
          <p className="text-gray-700 leading-relaxed">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;