import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';

export const App = () => {
  return (
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
}
