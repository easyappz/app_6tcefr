import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const rootEl = document.getElementById('root');
const root = ReactDOM.createRoot(rootEl);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div data-easytag="id1-react/src/index.js">
        <App />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);

if (typeof window !== 'undefined' && typeof window.handleRoutes === 'function') {
  window.handleRoutes(["/"]);
}

reportWebVitals();
