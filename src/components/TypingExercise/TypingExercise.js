import React, { Component } from 'react';
import LineSpan from './LineSpan/LineSpan';
import './TypingExercise.css';
import MasterInput from '../Layout/MasterInput/MasterInput';
import Statistics from './Statistics/Statistics';
import KeySound from '../KeySound/KeySound';
import ProgressBar from '../Layout/ProgressBar/ProgressBar';
import ExerciseNavigation from './ExerciseNavigation/ExerciseNavigation';

class TypingExercise extends Component {
  state = {
    originalText: this.props.exercise.text,
    typedText: '',
    mistakeIndexes: [],
    unfixedMistakes: this.props.exercise.text.split('').map(() => 0),
    timestamps: [],
  };

  componentDidMount() {
    this.keysCorrect = document.querySelectorAll('.key-correct');
    this.keysIncorrect = document.querySelectorAll('.key-incorrect');
  }

  createLineSpans = (text) => {
    const pattern = /[\w\W]{1,55}\W/g;
    const lines = this.state.originalText.match(pattern);
    let totalLength = 0;

    return lines.map((line) => {
      const startIndex = totalLength;
      totalLength += line.length;

      return (
        <LineSpan
          key={line}
          line={line}
          startIndex={startIndex}
          typedText={this.state.typedText}
          mistakeIndexes={this.state.mistakeIndexes}
          unfixedMistakes={this.state.unfixedMistakes}
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

  saveTimeStamp = () => {
    const timestamp = Math.round(new Date().getTime() / 1000);

    this.setState((prevState) => ({
      timestamps: [...prevState.timestamps, timestamp],
    }));
  };

  handleOnChange = (e) => {
    const { value } = e.target;
    const { originalText } = this.state;

    if (value.length <= originalText.length) {
      // TODO: Temporary, replace with Redux
      const isCorrect = value.slice(-1)[0] === originalText[value.length - 1];

      if (isCorrect) {
        this.saveTimeStamp();
      }
      // ==========================

      this.playSoundForKey(isCorrect);

      this.setState(() => ({ typedText: value }));
    }
  };

  render() {
    return (
      <div>
        <MasterInput
          keyUp={this.handleKeyUp}
          change={this.handleOnChange}
          keyDown={this.handleKeyDown}
          value={this.state.typedText}
        />

        <ExerciseNavigation isPrivate={true} />

        <ProgressBar
          originalText={this.state.originalText}
          typedText={this.state.typedText}
        />

        <div className="text-container">{this.createLineSpans()}</div>

        <Statistics
          typedText={this.state.typedText}
          mistakeIndexes={this.state.mistakeIndexes}
          unfixedMistakes={this.state.unfixedMistakes}
          timestamps={this.state.timestamps}
        />

        <KeySound />
      </div>
    );
  }
}

export default TypingExercise;
