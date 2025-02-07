import React from 'react';
import './ProgressBar.css';

function ProgressBar({ current, total }) {
  const percentage = Math.round((current / total) * 100);
  return (
    <div className="progress-bar">
      <div className="progress-bar__fill" style={{ width: `${percentage}%` }}></div>
    </div>
  );
}

export default ProgressBar;
