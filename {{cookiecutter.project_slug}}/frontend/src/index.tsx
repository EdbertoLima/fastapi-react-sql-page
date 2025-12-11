import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';

const container = document.getElementById('root');

if (!container) {
  throw new Error("Root container with id 'root' not found");
}

const root = createRoot(container);

root.render(
  <Router>
    <App />
  </Router>
);
