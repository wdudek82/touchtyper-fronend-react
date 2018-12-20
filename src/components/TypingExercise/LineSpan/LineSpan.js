import React, { Component } from 'react';
import TokenSpan from '../TokenSpan/TokenSpan';
import './LineSpan.css';

class LineSpan extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    let shouldUpdate = true; // TODO: Fix this!
    const { line, startIndex, typedText } = this.props;
    const typedTextLine = this.props.typedText.substr(startIndex, line.length);
    const newTypedTextLine = nextProps.typedText.substr(
      startIndex,
      line.length,
    );

    if (typedTextLine !== newTypedTextLine) {
      console.log('line: ', startIndex, typedText.length);
      shouldUpdate = true;
    }

    return shouldUpdate;
  }

  createTokenSpans = (line, lineStartIndex) => {
    const pattern = /\W*\w+\W*/g;
    const tokens = line.match(pattern);
    let totalLength = lineStartIndex;

    return tokens.map((token) => {
      const { typedText } = this.props;
      const startIndex = totalLength;
      totalLength += token.length;

      let classes = '';
      if (
        typedText.length >= startIndex &&
        typedText.length < startIndex + token.length
      ) {
        classes = 'current';
      }

      return (
        <TokenSpan
          key={`${token}_${startIndex}`}
          token={token}
          classes={classes}
          startIndex={startIndex}
          typedText={this.props.typedText}
          mistakeIndexes={this.props.mistakeIndexes}
          unfixedMistakes={this.props.unfixedMistakes}
        />
      );
    });
  };

  render() {
    const { line, startIndex } = this.props;
    return (
      <span className="line">{this.createTokenSpans(line, startIndex)}</span>
    );
  }
}

export default LineSpan;
