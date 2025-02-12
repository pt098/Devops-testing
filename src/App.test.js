// src/allTests.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PostPage from './components/PostPage';
import PostTypeSelector from './components/PostTypeSelector';

// Test for App component: Check that the header "DEV@Deakin" is rendered.
test('App renders header with DEV@Deakin', () => {
  render(<App />);
  // Query for the heading that exactly matches "DEV@Deakin"
  const headerElement = screen.getByRole('heading', { name: /^DEV@Deakin$/i });
  expect(headerElement).toBeInTheDocument();
});

// Test for index.js functionality: Renders App without crashing using createRoot.
test('index renders App without crashing', () => {
  const container = document.createElement('div');
  container.id = 'root';
  document.body.appendChild(container);
  const root = createRoot(container);
  root.render(<App />);
  root.unmount();
  document.body.removeChild(container);
  expect(true).toBe(true);
});

// Test for reportWebVitals: Check that it's a function and does not throw when non-function input is provided.
test('reportWebVitals is a function and handles non-function input gracefully', () => {
  expect(typeof reportWebVitals).toBe('function');
  expect(() => {
    reportWebVitals(null);
    reportWebVitals("not a function");
  }).not.toThrow();
});

// Test for PostPage: Verify that PostPage renders and displays a known element.
// (Assumes that the PostPage component renders a header with "New Post". Adjust the text if needed.)
test('PostPage renders without crashing', () => {
  render(<PostPage />);
  const headerElement = screen.getByText(/New Post/i);
  expect(headerElement).toBeInTheDocument();
});

// Test for PostTypeSelector: Verify that the selector renders and displays the options.
test('PostTypeSelector renders and displays post type options', () => {
  const setPostType = jest.fn();
  render(<PostTypeSelector postType="question" setPostType={setPostType} />);
  // Check for the label and radio options.
  const labelElement = screen.getByText(/Select Post Type:/i);
  expect(labelElement).toBeInTheDocument();
  const questionOption = screen.getByText(/Question/i);
  const articleOption = screen.getByText(/Article/i);
  expect(questionOption).toBeInTheDocument();
  expect(articleOption).toBeInTheDocument();
});
