// src/allTests.test.js

// Ensure document.body exists
if (!document.body) {
  const body = document.createElement('body');
  document.documentElement.appendChild(body);
  document.body = body;
}

import React from 'react';
import { render, screen } from '@testing-library/react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PostPage from './components/PostPage';
import PostTypeSelector from './components/PostTypeSelector';

// Test for App component: Check that the header "DEV@Deakin" is rendered.
test('renders header with DEV@Deakin', () => {
  render(<App />);
  // Use getByRole to find the <h1> element that exactly contains "DEV@Deakin".
  const headerElement = screen.getByRole('heading', { name: /^DEV@Deakin$/i });
  expect(headerElement).toBeInTheDocument();
});

// Test for index functionality: Render App using createRoot without crashing.
test('renders App without crashing (index test)', () => {
  const container = document.createElement('div');
  container.id = 'root';
  document.body.appendChild(container);
  const root = createRoot(container);
  root.render(<App />);
  root.unmount();
  document.body.removeChild(container);
  expect(true).toBe(true);
});

// Test for reportWebVitals: Verify that it is a function and handles non-function input gracefully.
test('reportWebVitals is a function and handles non-function input gracefully', () => {
  expect(typeof reportWebVitals).toBe('function');
  expect(() => {
    reportWebVitals(null);
    reportWebVitals("not a function");
  }).not.toThrow();
});

// Test for PostPage: Ensure that PostPage renders without crashing.
// (Assumes PostPage renders a header containing "New Post"; adjust if necessary.)
test('renders PostPage without crashing', () => {
  render(<PostPage />);
  const headerText = screen.getByText(/New Post/i);
  expect(headerText).toBeInTheDocument();
});

// Test for PostTypeSelector: Ensure that PostTypeSelector renders and displays expected options.
test('renders PostTypeSelector and displays post type options', () => {
  const setPostType = jest.fn();
  render(<PostTypeSelector postType="question" setPostType={setPostType} />);
  const labelElement = screen.getByText(/Select Post Type:/i);
  expect(labelElement).toBeInTheDocument();
  const questionOption = screen.getByText(/Question/i);
  const articleOption = screen.getByText(/Article/i);
  expect(questionOption).toBeInTheDocument();
  expect(articleOption).toBeInTheDocument();
});
