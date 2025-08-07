import React from 'react';

const CardSkeleton = () => {
  return (
    <div className="card-skeleton shimmer">
      <div className="skeleton-image"></div>
      <div className="skeleton-title"></div>
      <div className="skeleton-subtitle"></div>
    </div>
  );
};

export default CardSkeleton;
