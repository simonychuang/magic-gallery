import React, { FunctionComponent } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';

export const App: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
}
