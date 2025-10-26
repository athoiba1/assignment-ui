// Ensure this file includes the Bootstrap CSS import, if it's not already there.
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Your project's default CSS
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // <-- CRITICAL: Must be here

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);