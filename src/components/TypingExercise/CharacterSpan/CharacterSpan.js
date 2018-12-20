import React from 'react';
import './CharacterSpan.css';

class CharacterSpan extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    let shouldUpdate = false;
    const { typedText, charIndex, classes } = this.props;
    const nextTypedText = nextProps.typedText;

    if (
      typedText[charIndex] !== nextTypedText[charIndex] ||
      classes !== nextProps.classes
    ) {
      shouldUpdate = true;
    }

    return shouldUpdate;
  }

  render() {
    const { classes, children } = this.props;

    return (
      <span className={`char ${classes}`}>
        {children !== ' ' ? children : <i>&nbsp;</i>}
      </span>
    );
  }
}

export default CharacterSpan;
