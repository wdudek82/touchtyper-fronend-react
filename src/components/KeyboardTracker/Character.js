import React from 'react';
import './KeyboardTracker.css';

const Character = (props) => {
  console.log(props.character);
  return (
    <span className={`char ${props.classes}`}>
      {props.children !== ' ' ? props.children : <i>&nbsp;</i>}
    </span>
  );
};

export default Character;
