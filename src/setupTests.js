// src/setupTests.js
import '@testing-library/jest-dom/extend-expect';

// Ensure document.body exists.
if (!document.body) {
  document.body = document.createElement('body');
}
