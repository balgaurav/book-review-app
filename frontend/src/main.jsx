// frontend/src/main.jsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BookProvider } from './context/BookContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BookProvider>
      <App />
    </BookProvider>
  </StrictMode>,
);