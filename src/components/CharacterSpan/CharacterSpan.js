import React from 'react';
import './CharacterSpan.css';

const CharacterSpan = (props) => {
  return (
    <span className={`char ${props.classes || ''}`}>
      {props.children !== ' ' ? props.children : <i>&nbsp;</i>}
    </span>
  );
};

export default CharacterSpan;
