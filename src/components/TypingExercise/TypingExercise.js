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

  // createTokenSpans = (line, lineStartIndex) => {
  //   const pattern = /\W*\w+\W*/g;
  //   const tokens = line.match(pattern);
  //   let totalLength = lineStartIndex;
  //
  //   return tokens.map((token) => {
  //     const startIndex = totalLength;
  //     totalLength += token.length;
  //
  //     return (
  //       <TokenSpan key={_.uuid()}>{this.createCharSpans(token, startIndex)}</TokenSpan>
  //     );
  //   });
  // };

  // createCharSpans = (token, tokenStartIndex) => {
  //   return token.split('').map((char, index) => {
  //     const charIndex = tokenStartIndex + index;
  //     let classList = '';
  //     if (this.state.typedText[charIndex]) {
  //       classList =
  //         char === this.state.typedText[charIndex] ? 'correct' : 'incorrect';
  //     }
  //
  //     return (
  //       <CharacterSpan key={_.uuid()} classes={classList}>
  //         {char}
  //       </CharacterSpan>
  //     );
  //   });
  // };

  handleOnChange = (e) => {
    const { value } = e.target;

    this.setState(() => ({ typedText: value }));
  };

  render() {
    // console.log('typed: ', this.state.typedText, this.state.originalText.length);
    // this.createLineSpans(this.state.originalText);

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
