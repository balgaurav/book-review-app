// frontend/src/components/BookList.jsx

import React, { useContext } from 'react';
import { BookContext } from '../context/BookContext';

const BookList = () => {
  const { books } = useContext(BookContext);

  if (!books || books.length === 0) {
    return <h2>No books found.</h2>;
  }

  return (
    <div>
      <h2>Book List</h2>
      {books.map((book) => (
        <div key={book._id}>
          <h3>{book.title}</h3>
          <p>by {book.author}</p>
          <p>Genre: {book.genre}</p>
        </div>
      ))}
    </div>
  );
};

export default BookList;