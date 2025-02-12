// src/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header with DEV@Deakin', () => {
  render(<App />);
  // Query the heading element that exactly matches "DEV@Deakin"
  const headerElement = screen.getByRole('heading', { name: /^DEV@Deakin$/i });
  expect(headerElement).toBeInTheDocument();
});
