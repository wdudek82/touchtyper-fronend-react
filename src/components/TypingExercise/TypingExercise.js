import React, { Component } from 'react';
import _ from 'lodash-uuid';
import ProgressBar from '../Layout/ProgressBar/ProgressBar';
import './TypingExercise.css';

class TypingExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalText: props.text,
      typedText: '',
      cachedCharSpans: this.createCharSpans(this.props.text),
      cachedHtml: [],
      mistakesIndexes: [],
      tokensData: this.getTokensData(this.props.text),
      keysPressed: [],
      debug: [],
    };
  }

  componentDidMount() {
    // const tokensList = this.createTokensList();
    const initialHtml = this.createTokenSpans();
    // const initialCharSpans = this.createCharSpans(this.props.text);

    this.setState(() => ({
      cachedHtml: initialHtml,
      // cachedCharSpans: initialCharSpans,
      // tokensList,
    }));

    const mainInput = document.querySelector('#main-input');
    mainInput.addEventListener('blur', () => {
      setTimeout(() => mainInput.focus(), 1);
    });
  }

  createCharSpans = (text, classList = []) => {
    classList.splice(0, 0, 'char');
    return text.split('').map((char) => (
      <span key={_.uuid()} className={classList.join(' ')}>
        {char}
      </span>
    ));
  };

  createTokenSpans = (text = this.state.originalText) => {
    const charSpans = this.createCharSpans(text);
    let totalLength = 0;

    return this.state.tokensData.tokens.map((token, index) => {
      const start = totalLength || index;
      const end = totalLength + token.length;
      totalLength += token.length;
      return (
        <span key={_.uuid()} className="token">
          {charSpans.slice(start, end)}
        </span>
      );
    });
  };

  wrapInTokenSpan = (start, tokenLength) => {
    return (
      <span className="token current">
        {this.state.cachedCharSpans.slice(start, start + (tokenLength))}
      </span>
    );
  };

  getTokensData = (text) => {
    const pattern = /\W*\w+[\s\W]*/g;
    const tokens = text.match(pattern);

    const tokenIndexes = [0];
    let sum = tokens[0].length;
    for (let i = 1; i < tokens.length; i += 1) {
      tokenIndexes.push(sum);
      sum += tokens[i].length;
    }

    return { tokens, tokenIndexes };
  };

  findUpdatedTokenTokenIndexCharIndex = (index) => {
    const { tokensData: { tokens } } = this.state;

    let tokenPosition;
    let updatedToken;
    let updatedCharPositionInToken;
    let sum = 0;
    for (let i = 0; i < tokens.length; i += 1) {
      sum += tokens[i].length;
      if (index <= sum - 1) {
        tokenPosition = i;
        updatedToken = tokens[i];
        updatedCharPositionInToken =
          sum > tokens[0].length
            ? tokens[i].length - (sum - index)
            : index;
        break;
      }
    }

    return {
      updatedCharPositionInToken,
      updatedTokenData: {
        updatedToken,
        tokenPosition,
      },
    };
  };

  recreateHtmlStructureWithNewCharSpan = (originalText, index, updatedCharSpan) => {
    const {
      updatedTokenData: { updatedToken, tokenPosition },
    } = this.findUpdatedTokenTokenIndexCharIndex(index);
    const tokenStartingIndex = this.state.tokensData.tokenIndexes[tokenPosition];

    const updatedCachedCharSpans = this.state.cachedCharSpans;
    updatedCachedCharSpans[index] = updatedCharSpan;

    this.setState(() => ({ cachedCharSpans: updatedCachedCharSpans }));

    const newToken = this.wrapInTokenSpan(tokenStartingIndex, updatedToken.length);
    const updatedCachedHtml = this.state.cachedHtml;

    updatedCachedHtml[tokenPosition] = newToken;

    this.setState(() => ({ cachedHtml: updatedCachedHtml, debug: newToken }));
  };

  handleCharacterDiff = (text, forward) => {
    const { originalText } = this.state;
    const index = text.length - 1;

    let updatedCharSpan;
    const classList = ['char'];
    if (forward) {
      if (text[index] === originalText[index]) {
        const wasMistake = this.state.mistakesIndexes[index];
        classList.push(wasMistake ? 'fixed' : 'correct');
        updatedCharSpan = (
          <span className={classList.join(' ')}>{originalText[index]}</span>
        );
      } else {
        classList.push('incorrect');
        updatedCharSpan = (
          <span className={classList.join(' ')}>{originalText[index]}</span>
        );
        this.saveMistakeIndex(index);
      }
      this.recreateHtmlStructureWithNewCharSpan(originalText, index, updatedCharSpan);
    } else {
      updatedCharSpan = (
        <span className={classList.join(' ')}>{originalText[index + 1]}</span>
      );
      this.recreateHtmlStructureWithNewCharSpan(originalText, index + 1, updatedCharSpan);

      // updatedCharSpan = (
      //   <span className={classList.join(' ')}>{originalText[index]}</span>
      // );
      // this.recreateHtmlStructureWithNewCharSpan(originalText, index, updatedCharSpan);
    }
  };

  saveMistakeIndex = (index) => {
    const updatedMistakesIndexes = this.state.mistakesIndexes;
    updatedMistakesIndexes[index] = 1;

    this.setState(() => ({
      mistakesIndexes: updatedMistakesIndexes,
    }));
  };

  handleChange = (e) => {
    const { value } = e.target;

    this.setState(() => ({
      typedText: value,
    }));

    this.handleCharacterDiff(value, this.state.typedText.length < value.length);
  };

  handleKeyUp = (e) => {};

  render() {
    return (
      <div>
        <input
          id="main-input"
          type="text"
          value={this.state.typedText}
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          autoFocus={true}
        />

        <ProgressBar
          originalText={this.state.originalText}
          typedText={this.state.typedText}
        />

        <div className="text-container">{this.state.cachedHtml}</div>
        <div className="text-container">{this.state.debug}</div>
      </div>
    );
  }
}

export default TypingExercise;
