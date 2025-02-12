import '@testing-library/jest-dom/extend-expect';

if (!document.body) {
  const body = document.createElement('body');
  document.documentElement.appendChild(body);
  document.body = body;
}
console.log('document.body exists:', Boolean(document.body));
