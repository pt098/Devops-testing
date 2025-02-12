// src/index.test.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

test('renders App without crashing', () => {
  // Create a dummy container for rendering.
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
  
  // Render the App component into the dummy container.
  ReactDOM.render(<App />, root);
  
  // Clean up by unmounting the component and removing the container.
  ReactDOM.unmountComponentAtNode(root);
  document.body.removeChild(root);
  
  // A simple assertion to mark the test as passed.
  expect(true).toBe(true);
});
