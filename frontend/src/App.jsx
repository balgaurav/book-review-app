// frontend/src/App.jsx

import React from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';

function App() {
  return (
    <div>
      <h1>Book Review App</h1>
      <BookForm />
      <BookList />
    </div>
  );
}

export default App;