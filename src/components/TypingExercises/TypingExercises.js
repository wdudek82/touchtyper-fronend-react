import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './TypingExercises.css';

class TypingExercises extends Component {
  getExercises = () => {
    return this.props.exercises.exercises.map((exercise) => (
      <Link key={exercise.title} className="exercise" to={`exercise/${exercise.id}`}>
        <div>
          <span
            className={`exercise-privacy-status ${
              exercise.isPrivate ? 'private' : 'public'
            }`}
          />
          {exercise.id}. {exercise.title}
          <button type="button">Edit</button>
        </div>
      </Link>
    ));
  };

  render() {
    return (
      <div className="exercise-list">
        <h1>All Exercises</h1>
        <button type="button">Add exercise</button>
        <div>{this.getExercises()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  exercises: state.exercises,
});

export default connect(mapStateToProps)(TypingExercises);
