import React from 'react';

const Display = ({ value }) => {
  return (
    <div
      data-easytag="id1-react/src/components/calculator/Display.jsx"
      className="w-full bg-transparent"
    >
      <div
        data-easytag="id2-react/src/components/calculator/Display.jsx"
        className="text-right text-white font-light tracking-wide leading-none break-words"
        style={{ fontSize: '56px', lineHeight: 1.1, minHeight: '64px' }}
      >
        {value}
      </div>
    </div>
  );
};

export default Display;
