// src/allTests.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PostPage from './components/PostPage';
import PostTypeSelector from './components/PostTypeSelector';

// Ensure document.body is defined (jsdom should do this, but this is a safeguard)
beforeAll(() => {
  if (!document.body) {
    document.body = document.createElement('body');
  }
});

// Test for App component: Check that the header "DEV@Deakin" is rendered.
test('renders header with DEV@Deakin', () => {
  render(<App />);
  // Query the heading element with an exact match using a regular expression.
  const headerElement = screen.getByRole('heading', { name: /^DEV@Deakin$/i });
  expect(headerElement).toBeInTheDocument();
});

// Test for index.js functionality: Renders App without crashing using createRoot.
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

// Test for reportWebVitals: Verify that it's a function and handles non-function input without throwing.
test('reportWebVitals is a function and handles non-function input gracefully', () => {
  expect(typeof reportWebVitals).toBe('function');
  expect(() => {
    reportWebVitals(null);
    reportWebVitals("not a function");
  }).not.toThrow();
});

// Test for PostPage: Ensure PostPage renders without crashing.
test('renders PostPage without crashing', () => {
  render(<PostPage />);
  // Assumes PostPage renders a header containing "New Post" (adjust if needed).
  const headerText = screen.getByText(/New Post/i);
  expect(headerText).toBeInTheDocument();
});

// Test for PostTypeSelector: Ensure it renders and displays the expected options.
test('renders PostTypeSelector and displays post type options', () => {
  const setPostType = jest.fn();
  render(<PostTypeSelector postType="question" setPostType={setPostType} />);
  // Verify the label exists.
  const labelElement = screen.getByText(/Select Post Type:/i);
  expect(labelElement).toBeInTheDocument();
  // Verify both options are rendered.
  const questionOption = screen.getByText(/Question/i);
  const articleOption = screen.getByText(/Article/i);
  expect(questionOption).toBeInTheDocument();
  expect(articleOption).toBeInTheDocument();
});
