import React from 'react';
import './TokenSpan.css';

const TokenSpan = (props) => {
  const { charSpans, isCurrent, start, tokenLength } = props;

  return (
    <span className={`token ${isCurrent ? 'current' : ''}`}>
      {charSpans.slice(start, start + tokenLength)}
    </span>
  );
};

export default TokenSpan;
