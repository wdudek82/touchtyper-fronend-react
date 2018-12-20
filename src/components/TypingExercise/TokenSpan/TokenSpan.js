import React from 'react';
import './TokenSpan.css';
import CharacterSpan from '../CharacterSpan/CharacterSpan';

class TokenSpan extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    let shouldUpdate = false;
    const { token, startIndex, classes } = this.props;
    const typedTextToken = this.props.typedText.substr(
      startIndex,
      token.length,
    );
    const newTypedTextToken = nextProps.typedText.substr(
      startIndex,
      token.length,
    );

    if (typedTextToken !== newTypedTextToken || classes !== nextProps.classes) {
      shouldUpdate = true;
    }

    return shouldUpdate;
  }

  createCharSpans = (token, tokenStartIndex) => {
    return token.split('').map((char, charIndexInToken) => {
      const charIndex = tokenStartIndex + charIndexInToken;

      // console.log(
      //   'charIndex:',
      //   charIndex, 'typedText',
      //   this.props.typedText.length,
      //   'tokenStartIndex', tokenStartIndex,
      //   charIndex === this.props.typedText.length,
      // );

      let classes = '';
      if (this.props.typedText[charIndex]) {
        if (char === this.props.typedText[charIndex]) {
          classes = this.props.mistakeIndexes[charIndex] ? 'fixed' : 'correct';
          this.props.unfixedMistakes[charIndex] = 0;
        } else {
          classes = 'incorrect';
          // TODO: only temporary solution for testing - replace with redux
          this.props.mistakeIndexes[charIndex] = 1;
          this.props.unfixedMistakes[charIndex] = 1;
        }
      } else if (
        (this.props.typedText.length === charIndex) ||
        (tokenStartIndex === this.props.typedText.length && charIndexInToken === 0)
      ) {
        console.log('carret:', this.props.typedText.length === charIndexInToken);
        classes = 'caret';
      }

      return (
        <CharacterSpan
          key={`${char}_${charIndex}`}
          classes={classes}
          charIndex={charIndex}
          typedText={this.props.typedText}
        >
          {char}
        </CharacterSpan>
      );
    });
  };

  render() {
    const { token, classes, startIndex } = this.props;

    return (
      <span className={`token ${classes}`}>
        {this.createCharSpans(token, startIndex)}
      </span>
    );
  }
}

export default TokenSpan;
