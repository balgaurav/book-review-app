// frontend/src/components/BookList.jsx

import React, { useContext } from 'react';
import { BookContext } from '../context/BookContext';
import axios from 'axios';
import ReviewList from './ReviewList'; // <--- Import ReviewList
import ReviewForm from './ReviewForm'; // <--- Import ReviewForm

const BookList = () => {
  const { books, setBooks } = useContext(BookContext);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://localhost:3000/api/books/${bookId}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  if (!books || books.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📚</div>
        <h2 className="text-2xl font-semibold text-gray-600 mb-2">No books found</h2>
        <p className="text-gray-500">Start by adding your first book review above!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center section-title-underline">Book Collection</h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {books.map((book) => (
          <div key={book._id} className="book-card hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            {/* Book Header */}
            <div className="p-4">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-meta">by {book.author}</p>
              <p className="book-meta mt-2">{book.genre}</p>
            </div>

            {/* Book Content */}
            <div className="p-4">
              {/* Delete Button */}
              <div className="flex justify-end mb-4">
                <button 
                  onClick={() => handleDelete(book._id)}
                  className="delete-btn text-sm"
                >
                  Delete Book
                </button>
              </div>

              {/* Reviews Section */}
              <div className="space-y-4">
                <ReviewList reviews={book.reviews} />
                <ReviewForm bookId={book._id} onReviewAdded={fetchBooks} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;