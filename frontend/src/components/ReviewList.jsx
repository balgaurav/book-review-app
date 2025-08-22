// frontend/src/components/ReviewList.jsx

import React from 'react';

const ReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p>No reviews yet. Be the first to add one!</p>;
  }

  return (
    <div>
      <h4>Reviews:</h4>
      {reviews.map((review) => (
        <div key={review._id}>
          <p><strong>Rating:</strong> {review.rating}/5</p>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;