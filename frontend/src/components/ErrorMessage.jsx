import React from 'react';

const ErrorMessage = ({ message, onClose }) => {
  return (
    <div className="bg-red-900/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg relative mb-4 backdrop-blur-sm">
      <span className="block sm:inline">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-0 bottom-0 right-0 px-4 py-3 hover:text-red-200 transition-colors duration-300"
        >
          <span className="text-2xl">&times;</span>
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
