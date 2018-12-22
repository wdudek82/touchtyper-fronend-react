import React from 'react';
import { connect } from 'react-redux';
import { initializeExerciseState } from '../../../store/actions/exerciseActions';
import { Link } from 'react-router-dom';

const ExerciseNavigation = (props) => {
  return (
    <div>
      <Link to="/">
        <button type="button">Back</button>
      </Link>

      <button
        type="button"
        onClick={() => props.initializeExerciseState(props.text)}
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

export default connect(null, { initializeExerciseState })(ExerciseNavigation);
