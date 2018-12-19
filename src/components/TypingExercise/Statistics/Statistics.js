import React, { Component } from 'react';

class Statistics extends Component {
  state = {
    speed: '-',
    accuracy: {
      relative: '-',
      real: '-',
    },
  };

  componentDidMount() {
    this.registeredInterval = setInterval(this.calculateSpeed, 1000);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.typedText.length < nextProps.typedText.length) {
      this.calculateAccuracy();
    }
  }

  componentWillUnmount() {
    clearInterval(this.registeredInterval);
  }

  calculateSpeed = () => {
    const { timestamps, unfixedMistakes } = this.props;
    const sumOfUnfixed = unfixedMistakes.reduce((acc, curVal) => curVal + acc);
    const first = timestamps[0];
    const now = Math.round(new Date().getTime() / 1000);
    const timeDelta = now - first;
    let charsPerSecond = 0;

    if (timeDelta) {
      charsPerSecond =
        (((this.props.typedText.length - sumOfUnfixed) / timeDelta) * 60);
    }

    this.setState(() => ({
      speed: charsPerSecond > 0 ? Math.floor(charsPerSecond) : 0,
    }));
  };

  calculatePercentOfCorrectChars = (a, b) => {
    const percent = a / 100;
    const result = Math.floor(100 - b / percent);
    return result >= 0 ? result : 0;
  };

  calculateAccuracy = () => {
    const { typedText, mistakeIndexes, unfixedMistakes } = this.props;
    let sumOfUnfixed = 0;
    if (unfixedMistakes.length) {
      sumOfUnfixed = unfixedMistakes.reduce((acc, curVal) => curVal + acc);
    }
    let allMistakes = 0;
    if (mistakeIndexes.length) {
      allMistakes = mistakeIndexes.reduce((acc, curVal) => curVal + acc);
    }
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

  render() {
    const { speed, accuracy } = this.state;

    return (
      <div>
        <div>Speed: {speed} CPM ({Math.floor(speed / 5)} WPM)</div>
        <div>
          Acuracy: {accuracy.relative} (real: {accuracy.real})
        </div>
      </div>
    );
  }
}

export default Statistics;
