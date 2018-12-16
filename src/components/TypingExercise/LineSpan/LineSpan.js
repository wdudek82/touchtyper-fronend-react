import React, { Component } from 'react';
import TokenSpan from '../TokenSpan/TokenSpan';
import './LineSpan.css';

class LineSpan extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {

    let shouldUpdate = false;
    if (nextProps.typedTokens && this.props.typedTokens) {
      for (let i = 0; nextProps.typedTokens.length; i += 1) {
        if (nextProps.typedTokens[i] !== this.props.typedToken[i]) {
          console.group('LineSpan :: shouldComponentUpdate');
          console.log('nextProps', nextProps);
          console.log('nextState', nextState);
          console.log('nextContext', nextContext);
          console.groupEnd();

          shouldUpdate = true;
          break;
        }
      }
    }
    return shouldUpdate;
  }

  createTokenSpans = () => {
    const { tokens, typedTokens } = this.props;

    console.log('2. typed tokens:', typedTokens);
    return tokens.map((token, index) => {
      return <TokenSpan token={token} typedToken={typedTokens} />;
    });
  };

  render() {
    return <span className="line">{this.createTokenSpans()}</span>;
  }
}

export default LineSpan;
