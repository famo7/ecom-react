import React from 'react';

const Button = ({ text, onClick }) => {
  return (
    <div>
      <a
        onClick={onClick}
        href="#"
        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
      >
        {text}
      </a>
    </div>
  );
};

export default Button;
