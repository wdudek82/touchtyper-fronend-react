import React from 'react';
import cat from '../assets/images/cute-cat-clipart-256x256.png';

const Cat = (props) => {
  const { mouse } = props;

  return (
    <img
      src={cat}
      alt="a cute cat"
      style={{ position: 'absolute', left: mouse.x, top: mouse.y }}
    />
  );
};

export default Cat;
