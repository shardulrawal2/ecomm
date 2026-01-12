import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColor = type === 'success' ? 'bg-neon-cyan' : 'bg-red-500';
  const textColor = type === 'success' ? 'text-noir-950' : 'text-white';

  return (
    <div className={`fixed top-20 right-4 z-50 ${bgColor} ${textColor} px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 animate-pulse`}>
      <div className="flex items-center gap-2">
        <span className="font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-4 hover:opacity-75 transition-opacity"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast;
