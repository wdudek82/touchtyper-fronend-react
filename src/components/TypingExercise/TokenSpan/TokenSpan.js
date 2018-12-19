import React from 'react';
import './TokenSpan.css';
import CharacterSpan from '../CharacterSpan/CharacterSpan';

class TokenSpan extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    let shouldUpdate = false;
    const { token, startIndex } = this.props;
    const typedTextToken = this.props.typedText.substr(startIndex, token.length);
    const newTypedTextToken = nextProps.typedText.substr(startIndex, token.length);

    if (typedTextToken !== newTypedTextToken) {
      shouldUpdate = true;
    }

    return shouldUpdate;
  }

  createCharSpans = (token, tokenStartIndex) => {
    return token.split('').map((char, index) => {
      const charIndex = tokenStartIndex + index;
      let classes = '';
      if (this.props.typedText[charIndex]) {
        if (char === this.props.typedText[charIndex]) {
          classes = this.props.mistakes[charIndex] ? 'fixed' : 'correct';
        } else {
          classes = 'incorrect';
          this.props.mistakes[charIndex] = 1;
        }
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
    const { token, startIndex } = this.props;

    return (
      <span className={`token`}>
        {this.createCharSpans(token, startIndex)}
      </span>
    );
  }
}

export default TokenSpan;
