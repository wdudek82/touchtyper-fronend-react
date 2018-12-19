import React, { Component } from 'react';
import MasterInput from '../Layout/MasterInput/MasterInput';
import '../TypingExercise/TypingExercise.css';

// import LineSpan from './LineSpan/LineSpan';

class TypingExercise extends Component {
  state = {
    originalText: this.props.exercise.text,
    typedText: '',
    lineData: {},
    // tokensData: {},
  };

  componentDidMount() {
    this.getLinesData();
  }

  getTokensData = (text) => {
    const pattern = /\W*\w+[\s\W]*/g;
    const tokens = text.match(pattern);

    if (tokens) {
      const tokenIndexes = [0];
      let sum = tokens[0].length;
      for (let i = 1; i < tokens.length; i += 1) {
        tokenIndexes.push(sum);
        sum += tokens[i].length;
      }

      // this.setState(() => ({ tokensData: { tokens, tokenIndexes } }));
      return { tokens, tokenIndexes };
    }
    return null;
  };

  getLinesData = () => {
    const { tokens } = this.getTokensData(this.state.originalText);
    const lineMaxLength = 55;
    const lines = [];
    const lineStartingIndexes = [0];
    const lineLengths = [];
    let startingIndex = 0;
    let sum = 0;
    for (let i = 0; i < tokens.length; i += 1) {
      sum += tokens[i].length;

      if (tokens[i + 1] && sum + tokens[i + 1].length > lineMaxLength) {
        lineStartingIndexes.push(sum + lineStartingIndexes.slice(-1)[0]);
        lineLengths.push(sum);
        lines.push(tokens.slice(startingIndex, i));
        startingIndex = i;
        sum = 0;
      }
    }

    this.setState(() => ({ lineData: { lines, lineStartingIndexes, lineLengths } }));
  };

  createLineSpans = () => {
    const { lineData } = this.state;
    return lineData.lines.map((line, index) => {
      const typedTextTokens = this.getTokensData(
        this.state.typedText.substr(
          lineData.lineStartingIndexes[index],
          lineData.lineLengths[index],
        ),
      );

      return <LineSpan tokens={line} typedTokens={typedTextTokens && typedTextTokens.tokens} />;
    });
  };

  handleChange = (e) => {
    const { value } = e.target;
    const { originalText } = this.state;

    if (value.length <= originalText.length) {
      this.setState(() => ({ typedText: value }));
    }
  };

  handleKeyDown = (e) => {};

  handleKeyUp = (e) => {};

  render() {
    return (
      <div>
        <MasterInput
          keyUp={this.handleKeyUp}
          change={this.handleChange}
          keyDown={this.handleKeyDown}
          value={this.state.typedText}
        />

        <div className="text-container">
          {this.state.lineData.lines && this.createLineSpans()}
        </div>
      </div>
    );
  }
}

export default TypingExercise;
