import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addTimestamp,
  initializeExerciseState,
  initializeUnfixedMistakes,
  updateTypedText,
} from '../../store/actions/exerciseActions';
import LineSpan from './LineSpan/LineSpan';
import './TypingExercise.css';
import MasterInput from '../Layout/MasterInput/MasterInput';
import Statistics from './Statistics/Statistics';
import KeySound from '../KeySound/KeySound';
import ProgressBar from '../Layout/ProgressBar/ProgressBar';
import ExerciseNavigation from './ExerciseNavigation/ExerciseNavigation';

class TypingExercise extends Component {
  initializeExercise = () => {
    const { id } = this.props.match.params;
    const { text } = this.props.exercises.exercises[id - 1];

    this.props.initializeExerciseState(text);
  };

  componentDidMount() {
    this.keysCorrect = document.querySelectorAll('.key-correct');
    this.keysIncorrect = document.querySelectorAll('.key-incorrect');

    this.initializeExercise();
  }

  createLineSpans = (text) => {
    const pattern = /[\w\W]{1,55}[.!?\s]/g;
    const lines = text.match(pattern);
    let totalLength = 0;

    return lines.map((line) => {
      const startIndex = totalLength;
      totalLength += line.length;

      return (
        <LineSpan
          key={line}
          line={line}
          startIndex={startIndex}
          typedText={this.props.exercises.typedText}
          mistakeIndexes={this.props.exercises.mistakeIndexes}
          unfixedMistakes={this.props.exercises.unfixedMistakes}
        />
      );
    });
  };

  playSoundForKey = (isCorrect = true) => {
    for (let i = 0; i < this.keysCorrect.length; i += 1) {
      if (isCorrect) {
        if (this.keysCorrect[i].paused) {
          this.keysCorrect[i].play();
          break;
        }
      } else {
        if (this.keysIncorrect[i].paused) {
          this.keysIncorrect[i].play();
          break;
        }
      }
    }
  };

  handleOnChange = (e) => {
    const { value } = e.target;
    const { id } = this.props.match.params;
    const { text } = this.props.exercises.exercises[id - 1];

    if (value.length <= text.length) {
      // === TODO: Temporary, replace with Redux ===========
      const isCorrect = value.slice(-1)[0] === text[value.length - 1];

      if (isCorrect) {
        this.props.addTimestamp();
      }
      // ===================================================

      // TODO: There are some issues with soud after switching to Redux
      // this.playSoundForKey(isCorrect);

      this.props.updateTypedText(value);
    }
  };

  render() {
    const { id } = this.props.match.params;
    const { text } = this.props.exercises.exercises[id - 1];
    const { typedText } = this.props.exercises;

    return (
      <div>
        <MasterInput
          keyUp={this.handleKeyUp}
          change={this.handleOnChange}
          keyDown={this.handleKeyDown}
          value={typedText}
        />

        <ExerciseNavigation isPrivate={true} text={text} />

        <ProgressBar originalText={text} typedText={typedText} />

        <div className="text-container">{this.createLineSpans(text)}</div>

        <Statistics
          typedText={this.props.exercises.typedText}
          mistakeIndexes={this.props.exercises.mistakeIndexes}
          unfixedMistakes={this.props.exercises.unfixedMistakes}
          timestamps={this.props.exercises.timestamps}
        />

        <KeySound />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  exercises: state.exercises,
});

export default connect(
  mapStateToProps,
  {
    updateTypedText,
    initializeUnfixedMistakes,
    addTimestamp,
    initializeExerciseState,
  },
)(TypingExercise);
