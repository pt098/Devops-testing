// src/index.test.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index';

test('index.js loads and renders App without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
  expect(true).toBe(true);
});
