// src/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  const headerElement = screen.getByText(/DEV@Deakin/i);
  expect(headerElement).toBeInTheDocument();
});
