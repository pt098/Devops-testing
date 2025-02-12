// src/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header with DEV@Deakin', () => {
  render(<App />);
  // Check for "DEV@Deakin" in the document.
  const headerElement = screen.getByText(/DEV@Deakin/i);
  expect(headerElement).toBeInTheDocument();
});
