import React from 'react';
import './ProgressBar.css';

const ProgressBar = (props) => {
  const completed = Math.floor(
    props.typedText.length / (props.originalText.length / 100),
  );
  const progressMsg =
    completed === 100 ? 'Done!' : `${completed}% completed...`;

  return (
    <div className="progress-container">
      <div className="progress-label">{progressMsg}</div>
      <progress value={completed || 0} max="100" className="progress-bar" />
    </div>
  );
};

export default ProgressBar;
