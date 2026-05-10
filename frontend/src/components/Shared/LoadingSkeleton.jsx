import React from 'react';

const LoadingSkeleton = ({ count = 3, className }) => {
  return (
    <div className={`grid gap-6 ${className}`}>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="glass-card h-48 animate-pulse">
          <div className="h-6 bg-slate-800 rounded w-3/4 mb-4" />
          <div className="h-4 bg-slate-800 rounded w-1/2 mb-2" />
          <div className="h-4 bg-slate-800 rounded w-5/6" />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
