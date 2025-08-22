// frontend/src/components/BookList.jsx

import React, { useContext } from 'react';
import { BookContext } from '../context/BookContext';
import axios from 'axios'; // <--- Import Axios here

const BookList = () => {
  const { books, setBooks } = useContext(BookContext); // <--- Add setBooks here

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://localhost:3000/api/books/${bookId}`);
      
      // Filter out the deleted book from the state
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

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
          <button onClick={() => handleDelete(book._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default BookList;