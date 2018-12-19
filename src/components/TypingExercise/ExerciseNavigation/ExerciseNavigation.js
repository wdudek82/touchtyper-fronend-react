import React from 'react';
import { Link } from 'react-router-dom';

const ExerciseNavigation = (props) => {
  return (
    <div>
      <Link to="/">
        <button type="button">Back</button>
      </Link>

      <button
        type="button"
        onClick={() => console.log('=== NOT IMPLEMENTED ===')}
      >
        Restart
      </button>

      <button
        type="button"
        style={{ background: `${props.isPrivate ? 'red' : 'green'}` }}
        onClick={() => console.log('=== NOT IMPLEMENTED ===')}
      >
        {props.isPrivate ? 'Private' : 'Public'}
      </button>
    </div>
  );
};

export default ExerciseNavigation;
