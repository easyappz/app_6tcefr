import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <div data-easytag="id1-react/src/App.js" className="min-h-screen bg-black">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;
