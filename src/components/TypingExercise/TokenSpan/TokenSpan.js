import React from 'react';
import { connect } from 'react-redux';
import './TokenSpan.css';
import CharacterSpan from '../CharacterSpan/CharacterSpan';

class TokenSpan extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    let shouldUpdate = false;
    const { token, startIndex, classes } = this.props;
    const typedTextToken = this.props.exercises.typedText.substr(
      startIndex,
      token.length,
    );
    const newTypedTextToken = nextProps.exercises.typedText.substr(
      startIndex,
      token.length,
    );


    if (typedTextToken !== newTypedTextToken || classes !== nextProps.classes) {
      console.log("Comp:", this.props.exercises.typedText, ' | ',nextProps.exercises.typedText);
      console.log('token updated', token);
      shouldUpdate = true;
    }

    return shouldUpdate;
  }

  getCharStyles = (tokenStartIndex, char, charIndexInToken, charIndex) => {
    const {typedText } = this.props.exercises;
    const { mistakeIndexes, unfixedMistakes } = this.props;
    let classes = '';

    if (typedText[charIndex]) {
      if (char === typedText[charIndex]) {
        classes = mistakeIndexes[charIndex] ? 'fixed' : 'correct';
        unfixedMistakes[charIndex] = 0;
      } else {
        classes = 'incorrect';
        // TODO: only temporary solution for testing - replace with redux
        mistakeIndexes[charIndex] = 1;
        unfixedMistakes[charIndex] = 1;
      }
    } else if (
      typedText.length === charIndex ||
      (tokenStartIndex === typedText.length &&
        charIndexInToken === 0)
    ) {
      classes = 'caret';
    }

    return classes;
  };

  createCharSpans = (token, tokenStartIndex) => {
    return token.split('').map((char, charIndexInToken) => {
      const charIndex = tokenStartIndex + charIndexInToken;

      const classes = this.getCharStyles(
        tokenStartIndex,
        char,
        charIndexInToken,
        charIndex,
      );

      return (
        <CharacterSpan
          key={`${char}_${charIndex}`}
          classes={classes}
          charIndex={charIndex}
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

const mapStateToProps = (state) => ({
  exercises: state.exercises,
});

export default connect(mapStateToProps)(TokenSpan);
