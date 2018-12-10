import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TypingExercises extends Component {
  state = {
    exercises: [
      {
        id: 1,
        title: "Kerghan's Story",
        text:
          'And finally, I came to the place where souls go to die. Where the mirrored and worn spirits fall into an endless sea of grey, mirrored glass... and I lowered myself within... and lay among them... and I almost did not return. And do you know what I found there? There, among the silent and battered shells of the innumerable? Peace. Enlightenment. Truth.',
        private: true,
      },
      {
        id: 2,
        title: 'Present Continuous',
        text:
          'The present continuous (also called present progressive) is a verb tense which is used to show that an ongoing action is happening now, either at the moment of speech or now in a larger sense. The present continuous can also be used to show that an action is going to take place in the near future. Read on for detailed descriptions, examples, and present continuous exercises.',
        private: false,
      },
      {
        id: 3,
        title: 'The quick brown fox',
        text: 'The quick brown fox jumps over the lazy dog.',
        private: false,
      },
      {
        id: 4,
        title: 'Lorem ipsum',
        text:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, omnis!',
        private: false,
      },
    ],
  };

  getExercises = () => {
    return this.state.exercises.map((item) => (
      <li key={item.title}>
        <Link to={`exercise/${item.id}`}>
          {item.title}
        </Link>
      </li>

    ));
  };

  render() {
    return (
      <div>
        <h1>All Exercises</h1>
        <ol>
          {this.getExercises()}
        </ol>
      </div>
    );
  }
}

export default TypingExercises;
