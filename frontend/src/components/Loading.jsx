import React from 'react';
import LoadingSkeleton from './LoadingSkeleton';

const Loading = ({ type = 'spinner' }) => {
  if (type === 'skeleton') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-noir-950">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-neon-cyan border-opacity-75"></div>
    </div>
  );
};

export default Loading;
