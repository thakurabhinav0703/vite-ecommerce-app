import React from 'react';
import './Loader.css';

const Loader = ({ type = 'spinner', count = 8 }) => {
  if (type === 'skeleton') {
    return (
      <div className="skeleton-grid">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="skeleton-card glass-card">
            <div className="skeleton-image shine"></div>
            <div className="skeleton-content">
              <div className="skeleton-text title shine"></div>
              <div className="skeleton-text brand shine"></div>
              <div className="skeleton-text rating shine"></div>
              <div className="skeleton-footer">
                <div className="skeleton-text price shine"></div>
                <div className="skeleton-button shine"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="spinner-container">
      <div className="spinner-glow"></div>
      <div className="spinner"></div>
      <p className="loading-text">Enhancing Your Experience...</p>
    </div>
  );
};

export default Loader;
