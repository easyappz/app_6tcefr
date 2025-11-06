import React from 'react';
import Calculator from '../components/calculator/Calculator';

const Home = () => {
  return (
    <div
      data-easytag="id1-react/src/pages/Home.jsx"
      className="min-h-screen w-full bg-[color:var(--calc-bg,#0b0b0b)] flex items-center justify-center p-4"
      style={{ backgroundColor: '#0b0b0b' }}
    >
      <div data-easytag="id2-react/src/pages/Home.jsx" className="w-full max-w-sm sm:max-w-md md:max-w-lg">
        <Calculator />
      </div>
    </div>
  );
};

export default Home;
