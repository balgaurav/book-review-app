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
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Book Collection</h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {books.map((book) => (
          <div key={book._id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            {/* Book Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
              <h3 className="text-xl font-bold mb-2 leading-tight">{book.title}</h3>
              <p className="text-blue-100 mb-1">by {book.author}</p>
              <span className="inline-block bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">
                {book.genre}
              </span>
            </div>

            {/* Book Content */}
            <div className="p-6">
              {/* Delete Button */}
              <div className="flex justify-end mb-4">
                <button 
                  onClick={() => handleDelete(book._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200 text-sm"
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