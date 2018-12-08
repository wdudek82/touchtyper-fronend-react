import React from 'react';
import './KeyboardTracker.css';

const CharacterSpan = (props) => {
  return (
    <span className={`char ${props.classes}`}>
      {props.children !== ' ' ? props.children : <i>&nbsp;</i>}
    </span>
  );
};

export default CharacterSpan;
