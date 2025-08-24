// frontend/src/App.jsx

import React from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl sm:text-2xl font-bold">Book Review App</h1>
            <div className="hidden sm:flex space-x-4">
              <span className="text-blue-100 text-sm lg:text-base">📚 Discover • Review • Share</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <BookForm />
            <BookList />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className="text-gray-300">
              © 2025 Book Review App. Built with React & TailwindCSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;