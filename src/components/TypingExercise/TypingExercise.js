import React, { Component } from 'react';
import _ from 'lodash-uuid';
import ProgressBar from '../Layout/ProgressBar/ProgressBar';
import './TypingExercise.css';
import CharacterSpan from '../CharacterSpan/CharacterSpan';
import MasterInput from '../Layout/MasterInput/MasterInput';

class TypingExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalText: props.text,
      typedText: '',
      cachedCharSpans: this.createInitialCharSpans(this.props.text),
      cachedHtml: [],
      mistakesIndexes: [],
      tokensData: this.getTokensData(this.props.text),
      keysPressed: [],
    };
  }

  componentDidMount() {
    const initialHtml = this.createInitialTokenSpans();

    this.setState(() => ({
      cachedHtml: initialHtml,
    }));
  }

  createInitialCharSpans = (text) => {
    return text.split('').map((char, index) => (
      <CharacterSpan key={_.uuid()} classes={index === 0 && 'caret'}>
        {char}
      </CharacterSpan>
    ));
  };

  createInitialTokenSpans = () => {
    const { cachedCharSpans } = this.state;
    let totalLength = 0;

    return this.state.tokensData.tokens.map((token, index) => {
      const start = totalLength || index;
      const end = totalLength + token.length;
      totalLength += token.length;
      return (
        <span key={_.uuid()} className="token">
          {cachedCharSpans.slice(start, end)}
        </span>
      );
    });
  };

  wrapInTokenSpan = (start, tokenLength) => {
    return (
      <span key={_.uuid()} className="token current">
        {this.state.cachedCharSpans.slice(start, start + tokenLength)}
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
    const {
      tokensData: { tokens },
    } = this.state;

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
          sum > tokens[0].length ? tokens[i].length - (sum - index) : index;
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

  updateCharSpans = (index, updatedCharSpan) => {
    const {
      updatedCharPositionInToken,
      updatedTokenData: { updatedToken, tokenPosition },
    } = this.findUpdatedTokenTokenIndexCharIndex(index);

    const updatedCachedCharSpans = this.state.cachedCharSpans;
    updatedCachedCharSpans[index] = updatedCharSpan;

    // Add caret ============================
    updatedCachedCharSpans[index + 1] = (
      <CharacterSpan classes="caret">{this.state.originalText[index + 1]}</CharacterSpan>
    );

    // Add caret to the first character of the next token
    // if (updatedCharPositionInToken === updatedToken.length - 1) {
    //   updatedCachedCharSpans[index + 1] = (
    //     <CharacterSpan classes="caret">{this.state.originalText[index + 1]}</CharacterSpan>
    //   );
    // }
    // =======================================

    this.setState(() => ({ cachedCharSpans: updatedCachedCharSpans }));

    this.updateCachedHtml(updatedToken, tokenPosition);
  };

  updateCachedHtml = (updatedToken, tokenPosition) => {
    const tokenStartingIndex = this.state.tokensData.tokenIndexes[
      tokenPosition
    ];

    const newToken = this.wrapInTokenSpan(
      tokenStartingIndex,
      updatedToken.length,
    );
    const updatedCachedHtml = this.state.cachedHtml;

    updatedCachedHtml[tokenPosition] = newToken;

    this.setState(() => ({ cachedHtml: updatedCachedHtml }));
  };

  handleCharacterDiff = (text, forward) => {
    const { originalText } = this.state;
    const index = text.length - 1;

    let updatedCharSpan;
    const classList = [];
    if (forward) {
      if (text[index] === originalText[index]) {
        const wasMistake = this.state.mistakesIndexes[index];
        classList.push(wasMistake ? 'fixed' : 'correct');
        updatedCharSpan = (
          <CharacterSpan key={_.uuid()} classes={classList}>
            {originalText[index]}
          </CharacterSpan>
        );
      } else {
        classList.push('incorrect');
        updatedCharSpan = (
          <CharacterSpan key={_.uuid()} classes={classList}>
            {originalText[index]}
          </CharacterSpan>
        );
        this.saveMistakeIndex(index);
      }
      this.updateCharSpans(index, updatedCharSpan);
    } else {
      updatedCharSpan = (
        <CharacterSpan key={_.uuid()} classes={classList}>
          {originalText[index + 1]}
        </CharacterSpan>
      );
      this.updateCharSpans(index + 1, updatedCharSpan);
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
        <MasterInput
          keyUp={this.handleKeyUp}
          change={this.handleChange}
          value={this.state.typedText}
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
