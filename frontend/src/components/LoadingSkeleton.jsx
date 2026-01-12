import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-noir-900 rounded-xl border border-noir-800 overflow-hidden">
        <div className="bg-noir-800 h-48"></div>
        <div className="p-4">
          <div className="bg-noir-800 h-6 rounded mb-2"></div>
          <div className="bg-noir-800 h-4 rounded mb-3"></div>
          <div className="bg-noir-800 h-4 rounded mb-4 w-3/4"></div>
          <div className="flex justify-between items-center mb-4">
            <div className="bg-noir-800 h-8 rounded w-20"></div>
            <div className="bg-noir-800 h-4 rounded w-16"></div>
          </div>
          <div className="flex gap-2">
            <div className="bg-noir-800 h-10 rounded flex-1"></div>
            <div className="bg-noir-800 h-10 rounded flex-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
