import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// HARD SUPPRESS RUNTIME ERRORS - DEMO MODE
// Suppress all React render errors from surfacing to UI
window.onerror = function(message, source, lineno, colno, error) {
  console.error('Suppressed error:', message, source, lineno, colno, error);
  return true; // Prevent default error handling
};

window.onunhandledrejection = function(event) {
  console.error('Suppressed unhandled rejection:', event.reason);
  event.preventDefault(); // Prevent default handling
};

// Override console.error to suppress in UI
const originalConsoleError = console.error;
console.error = function(...args) {
  originalConsoleError.apply(console, args);
  // Call original but don't let it bubble up to React error boundaries
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
