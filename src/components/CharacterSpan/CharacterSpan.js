import React from 'react';
// TODO: Move char styles to its own style sheet
import './CharacterSpan.css';

const CharacterSpan = (props) => {
  return (
    <span className={`char ${props.classes || ''}`}>
      {props.children !== ' ' ? props.children : <i>&nbsp;</i>}
    </span>
  );
};

export default CharacterSpan;
