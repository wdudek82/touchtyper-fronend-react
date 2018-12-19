import React, { Component } from 'react';
import LineSpan from './LineSpan/LineSpan';
import './TypingExercise.css';

class TypingExercise extends Component {
  state = {
    originalText: this.props.exercise.text,
    typedText: '',
  };

  componentDidMount() {}

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
        />
      );
    });
  };

  handleOnChange = (e) => {
    const { value } = e.target;

    this.setState(() => ({ typedText: value }));
  };

  render() {
    return (
      <div>
        <h1>Hello, World!</h1>
        <input
          type="text"
          value={this.state.typedText}
          onChange={this.handleOnChange}
        />

        <div className="text-container">
          {this.createLineSpans()}
        </div>
      </div>
    );
  }
}

export default TypingExercise;
