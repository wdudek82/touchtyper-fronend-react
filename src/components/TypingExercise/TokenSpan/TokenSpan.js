import React from 'react';
import './TokenSpan.css';
import CharacterSpan from '../CharacterSpan/CharacterSpan';

class TokenSpan extends React.Component {
  componentWillMount() {
    // console.log('token did mount', this.props);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    // console.log('will receive', nextProps);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    let shouldUpdate = true;
    if (nextProps.typedToken === this.props.typedToken) {
      shouldUpdate = false;
    }

    return shouldUpdate;
  }

  createCharSpans = () => {
    const { token, typedToken } = this.props;


    return token.split('').map((char, index) => {
      let classes = '';
      if (typedToken && typedToken[index]) {
        classes = typedToken[index] === char ? 'correct' : 'incorrect';
      }
      return <CharacterSpan classes={classes}>{char}</CharacterSpan>;
    });
  };

  render() {
    const { charSpans, isCurrent, start, tokenLength } = this.props;

    return (
      <span className={`token ${isCurrent ? 'current' : ''}`}>
        {this.createCharSpans()}
      </span>
    );
  }
}

export default TokenSpan;
