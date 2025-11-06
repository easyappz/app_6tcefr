import React from 'react';

const baseBtn = 'rounded-full text-white text-2xl sm:text-3xl font-medium py-4 sm:py-5 transition-colors transition-transform duration-150 active:scale-95 select-none';

function getClasses(type, active) {
  if (type === 'func') {
    return `${baseBtn} bg-[#a5a5a5] text-black active:bg-[#bfbfbf]`;
  }
  if (type === 'op') {
    return `${baseBtn} ${active ? 'bg-white text-[color:#ff9f0a]' : 'bg-[#ff9f0a] text-white'} active:bg-[#ffb037]`;
  }
  return `${baseBtn} bg-[#333333] active:bg-[#4a4a4a]`;
}

const Key = ({ label, type, onPress, wide = false, active = false, index }) => {
  return (
    <button
      data-easytag={`id${index + 1}-react/src/components/calculator/Key.jsx`}
      type="button"
      className={`${getClasses(type, active)} ${wide ? 'col-span-2 text-left pl-8 pr-6' : ''}`}
      onClick={onPress}
    >
      {label}
    </button>
  );
};

export default Key;
