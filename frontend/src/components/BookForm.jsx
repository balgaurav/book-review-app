// frontend/src/components/BookForm.jsx

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { BookContext } from '../context/BookContext';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setBooks } = useContext(BookContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post('http://localhost:3000/api/books', {
        title,
        author,
        genre,
      });

      // Update the state with the new book
      setBooks((prevBooks) => [...prevBooks, response.data]);
      
      // Clear the form
      setTitle('');
      setAuthor('');
      setGenre('');
    } catch (error) {
      console.error('Error adding book:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add a New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter book title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Author:
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter author name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Genre:
          </label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter genre"
          />
        </div>
        <button 
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium ${
            isSubmitting 
              ? 'bg-blue-400 text-white cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Adding Book...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default BookForm;