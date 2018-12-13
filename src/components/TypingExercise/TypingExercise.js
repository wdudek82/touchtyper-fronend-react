import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash-uuid';
import ProgressBar from '../Layout/ProgressBar/ProgressBar';
import './TypingExercise.css';
import CharacterSpan from './CharacterSpan/CharacterSpan';
import MasterInput from '../Layout/MasterInput/MasterInput';
import TokenSpan from './TokenSpan/TokenSpan';
import button from '../../assets/sounds/button.wav';
import error from '../../assets/sounds/error.wav';

class TypingExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalText: '',
      typedText: '',
      tokensData: {},
      cachedCharSpans: '',
      cachedHtml: [],
      mistakesIndexes: [],
      unfixedMistakes: [],
      keyPressed: '',
      timeStampOfLastCorrectChar: 0,
      timestamps: [],
      speed: 0,
      accuracy: {
        relative: '-',
        real: '-',
      },
    };
  }

  componentDidMount() {
    this.initializeExercise();
    this.registeredInterval = setInterval(this.calculateSpeed, 500);
  }

  componentWillUnmount() {
    clearInterval(this.registeredInterval);
  }

  initializeExercise = () => {
    const { text, isPrivate } = this.props.exercise;
    const initialTokensData = this.getTokensData(text);
    const initialCharSpans = this.createInitialCharSpans(text);
    const initialHtml = this.createInitialTokenSpans(
      initialTokensData,
      initialCharSpans,
    );
    const initialMistakesIndexes = initialCharSpans.map(() => 0);
    const initialUnfixedMistakes = initialCharSpans.map(() => 0);

    this.setState(() => ({
      originalText: text,
      typedText: '',
      tokensData: initialTokensData,
      cachedHtml: initialHtml,
      cachedCharSpans: initialCharSpans,
      mistakesIndexes: initialMistakesIndexes,
      unfixedMistakes: initialUnfixedMistakes,
      keyPressed: '',
      timestamps: [],
      speed: 0,
      accuracy: {
        relative: '-',
        real: '-',
      },
    }));
  };

  createInitialCharSpans = (text) => {
    return text.split('').map((char, index) => (
      <CharacterSpan key={_.uuid()} classes={index === 0 && 'caret'}>
        {char}
      </CharacterSpan>
    ));
  };

  createInitialTokenSpans = (tokensData, charSpans) => {
    let totalLength = 0;

    return tokensData.tokens.map((token, index) => {
      const start = totalLength || index;
      totalLength += token.length;
      return this.wrapInTokenSpan(start, token.length, index === 0, charSpans);
    });
  };

  wrapInTokenSpan = (
    start,
    tokenLength,
    isCurrent,
    cachedCharSpans = this.state.cachedCharSpans,
  ) => {
    return (
      <TokenSpan
        key={_.uuid()}
        charSpans={cachedCharSpans}
        start={start}
        tokenLength={tokenLength}
        isCurrent={isCurrent}
      />
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

  updateCachedCharSpans = (index, updatedCharSpan, forward = true) => {
    const {
      updatedCharPositionInToken,
      updatedTokenData: { updatedToken, tokenPosition },
    } = this.findUpdatedTokenTokenIndexCharIndex(index);

    const updatedCachedCharSpans = this.state.cachedCharSpans;
    updatedCachedCharSpans[index] = updatedCharSpan;

    // Add caret
    const caretOffset = forward ? 1 : 0;
    updatedCachedCharSpans[index + caretOffset] = this.createNewCharSpan(
      this.state.originalText[index + caretOffset],
      'caret',
    );

    // Remove caret if typing direction is not forward
    if (!forward) {
      updatedCachedCharSpans[index + 1] = this.createNewCharSpan(
        this.state.originalText[index + 1],
      );
    }
    // ...and if from the first char of a token if backspace was pressed
    if (!forward && updatedCharPositionInToken === 0) {
      updatedCachedCharSpans[index - 1] = this.createNewCharSpan(
        this.state.originalText[index - 1],
      );
    }

    this.setState(() => ({ cachedCharSpans: updatedCachedCharSpans }));

    // check if char span with caret is at the last char of a token
    // forward: add caret to the first char of a next token
    // !forward: remove caret from first char of a next token
    if (updatedCharPositionInToken >= updatedToken.length - 1) {
      const nextToken = this.state.tokensData.tokens[tokenPosition + 1];

      // forward: remove "current" class from previous token
      // !forward: remove "current" class from next token
      this.updateCachedHtml(nextToken, tokenPosition + true, forward);

      this.updateCachedHtml(updatedToken, tokenPosition, !forward);
    } else {
      this.updateCachedHtml(updatedToken, tokenPosition, true);
    }
  };

  updateCachedHtml = (updatedToken, tokenPosition, isCurrentToken) => {
    const tokenStartingIndex = this.state.tokensData.tokenIndexes[
      tokenPosition
    ];

    if (updatedToken) {
      const newToken = this.wrapInTokenSpan(
        tokenStartingIndex,
        updatedToken.length,
        isCurrentToken,
      );
      const updatedCachedHtml = this.state.cachedHtml;

      updatedCachedHtml[tokenPosition] = newToken;

      this.setState(() => ({ cachedHtml: updatedCachedHtml }));
    }
  };

  createNewCharSpan = (char, classList = []) => (
    <CharacterSpan key={_.uuid()} classes={classList}>
      {char}
    </CharacterSpan>
  );

  handleCharacterDiff = (text, forward) => {
    const { originalText } = this.state;
    const index = text.length - 1;
    const isTypedCorrect = text[index] === originalText[index];

    let updatedCharSpan;
    if (forward) {
      if (isTypedCorrect) {
        const wasMistake = this.state.mistakesIndexes[index];

        this.updateUnfixedMistakes(index, true);
        this.saveTimeStamp();

        updatedCharSpan = this.createNewCharSpan(
          originalText[index],
          wasMistake ? 'fixed' : 'correct',
        );
      } else {
        this.updateUnfixedMistakes(index, false);

        updatedCharSpan = this.createNewCharSpan(
          originalText[index],
          'incorrect',
        );
        this.saveMistakeIndex(index);
      }
      this.updateCachedCharSpans(index, updatedCharSpan);
    } else {
      // If player uses backspace, remove all styling besides "char" class
      // from char that was on a position affected by backspace
      updatedCharSpan = this.createNewCharSpan(originalText[index + 1]);
      this.updateCachedCharSpans(index + 1, updatedCharSpan, forward);
    }

    this.playSoundForKey(isTypedCorrect);
  };

  saveMistakeIndex = (index) => {
    const updatedMistakesIndexes = this.state.mistakesIndexes;
    updatedMistakesIndexes[index] = 1;

    this.setState(() => ({
      mistakesIndexes: updatedMistakesIndexes,
    }));
  };

  updateUnfixedMistakes = (index, isCorrect) => {
    const { unfixedMistakes } = this.state;
    unfixedMistakes[index] = isCorrect ? 0 : 1;

    this.setState(() => ({ unfixedMistakes }));
  };

  saveTimeStamp = () => {
    const timestamp = Math.round(new Date().getTime() / 1000);

    this.setState((prevState) => ({
      timeStampOfLastCorrectChar: timestamp,
      timestamps: [...prevState.timestamps, timestamp],
    }));
  };

  calculateSpeed = () => {
    const { timestamps, unfixedMistakes } = this.state;
    const sumOfUnfixed = unfixedMistakes.reduce((acc, curVal) => curVal + acc);
    const first = timestamps[0];
    const now = Math.round(new Date().getTime() / 1000);
    const timeDelta = now - first;
    let charsPerSecond = 0;

    if (timeDelta) {
      charsPerSecond =
        (((this.state.typedText.length - sumOfUnfixed) / timeDelta) * 60) / 5;
    }

    this.setState(() => ({
      speed: charsPerSecond > 0 ? Math.floor(charsPerSecond) : 0,
    }));
  };

  calculatePercentOfCorrectChars = (a, b) => {
    const percent = a / 100;
    const result = Math.floor(100 - (b / percent));
    return result >= 0 ? result : 0;
  };

  calculateAccuracy = () => {
    const { typedText, mistakesIndexes, unfixedMistakes } = this.state;
    const sumOfUnfixed = unfixedMistakes.reduce((acc, curVal) => curVal + acc);
    const allMistakes = mistakesIndexes.reduce((acc, curVal) => curVal + acc);
    let relativeAccuracy = '100';
    let realAccuracy = '100';

    if (sumOfUnfixed) {
      relativeAccuracy = this.calculatePercentOfCorrectChars(
        typedText.length,
        sumOfUnfixed,
      );
    }
    if (allMistakes) {
      realAccuracy = this.calculatePercentOfCorrectChars(
        typedText.length,
        allMistakes,
      );
    }

    this.setState(() => ({
      accuracy: { relative: `${relativeAccuracy}%`, real: `${realAccuracy}%` },
    }));
  };

  playSoundForKey = (isCorrect = true) => {
    const keysCorrect = document.querySelectorAll('.key-correct');
    const keysIncorrect = document.querySelectorAll('.key-incorrect');

    for (let i = 0; i < keysCorrect.length; i += 1) {
      if (isCorrect) {
        if (keysCorrect[i].paused) {
          keysCorrect[i].play();
          break;
        }
      } else {
        if (keysIncorrect[i].paused) {
          keysIncorrect[i].play();
          break;
        }
      }
    }
  };

  handleChange = (e) => {
    const { value } = e.target;
    const { originalText, typedText } = this.state;

    // this.playSoundForKey();

    if (value.length <= originalText.length) {
      this.setState(() => ({ typedText: value }));
      this.handleCharacterDiff(value, typedText.length <= value.length);
      this.calculateAccuracy();
    }
  };

  handleKeyDown = (e) => {};

  handleKeyUp = (e) => {};

  resetExercise = () => {
    this.initializeExercise();
  };

  render() {
    const { accuracy, speed, timestamps } = this.state;
    const { isPrivate } = this.props.exercise.isPrivate;

    return (
      <div>
        <MasterInput
          keyUp={this.handleKeyUp}
          change={this.handleChange}
          keyDown={this.handleKeyDown}
          value={this.state.typedText}
        />

        <Link to="/">
          <button type="button">Back</button>
        </Link>
        <button type="button" onClick={this.resetExercise}>
          Restart
        </button>
        <button
          type="button"
          style={{ background: `${isPrivate ? 'green' : 'red'}` }}
          onClick={() => {
            this.setState((prevState) => ({ isPrivate: !prevState.isPrivate }));
          }}
        >
          {isPrivate ? 'Public' : 'Private'}
        </button>

        <ProgressBar
          originalText={this.state.originalText}
          typedText={this.state.typedText}
        />

        <div className="text-container">{this.state.cachedHtml}</div>

        <div>
          <div>Speed: {speed}</div>
          <div>
            Acuracy: {accuracy.relative} (real: {accuracy.real})
          </div>
          <div>Rythm: ???</div>
        </div>

        <audio id="key1" className="key-correct" src={button} />
        <audio id="key2" className="key-correct" src={button} />
        <audio id="key3" className="key-correct" src={button} />
        <audio id="key4" className="key-correct" src={button} />
        <audio id="key5" className="key-correct" src={button} />
        <audio id="key6" className="key-correct" src={button} />

        <audio id="key7" className="key-incorrect" src={error} />
        <audio id="key8" className="key-incorrect" src={error} />
        <audio id="key9" className="key-incorrect" src={error} />
        <audio id="key10" className="key-incorrect" src={error} />
        <audio id="key11" className="key-incorrect" src={error} />
        <audio id="key12" className="key-incorrect" src={error} />
      </div>
    );
  }
}

export default TypingExercise;
