import React from 'react';
import './CharacterSpan.css';

class CharacterSpan extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    let shouldUpdate = false;
    const { typedText, charIndex} = this.props;
    const nextTypedText = nextProps.typedText;

    if (typedText[charIndex] !== nextTypedText[charIndex]) {
      shouldUpdate = true;
    }

    return shouldUpdate;
  }

  render() {
    return (
      <span className={`char ${this.props.classes || ''}`}>
        {this.props.children !== ' ' ? this.props.children : <i>&nbsp;</i>}
      </span>
    );
  };
}

export default CharacterSpan;
