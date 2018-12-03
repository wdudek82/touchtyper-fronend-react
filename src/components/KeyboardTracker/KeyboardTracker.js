import React, { Component } from 'react';
import './KeyboardTracker.css';

class KeyboardTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalText:
        'This is only a test string. Some sample sentence to test whole application!:)',
      typedText: '',
      results: [],
    };
  }

  componentDidMount() {
    const root = document.querySelector('body');
    root.addEventListener('keydown', this.handleKeyPressed);
  }

  handleKeyPressed = (e) => {
    let updatedTypedText = this.state.typedText;

    switch (window.event.keyCode) {
      case 8:
        updatedTypedText = this.state.typedText.substring(
          0,
          this.state.typedText.length - 1,
        );
        break;
      case 9: // Tab
      case 13: // Enter
      case 16: // Shift
      case 17: // Ctrl
      case 18: // Alt
      case 20: // Backspace
      case 27: // Esc
      case 122: // F11
      case 123: // F12
        break;
      default: {
        e.preventDefault();

        if (this.state.typedText.length < this.state.originalText.length) {
          updatedTypedText = this.state.typedText + window.event.key;
        } else {
          updatedTypedText = this.state.typedText;
        }
      }
    }

    this.setState(() => ({
      typedText: updatedTypedText,
    }));
  };

  renderWordsRegex = () => {
    const pattern = /\w+[\s\W]*/g;
    const tokens = this.state.originalText.match(pattern);
    const result = [];

    let offset = 0;
    for (let i = 0; i < tokens.length; i += 1) {
      const token = tokens[i];
      result.push(
        <span className="word">
          {this.renderCharsRegex(token, offset)}
        </span>
      );
      offset += token.length;
    }

    return result;
  };

  renderCharsRegex = (token, offset) => {
    console.log(token);
    return token.split('').map((char) => (
      <span>{char !== ' ' ? char : <i>&nbsp;</i>}</span>
    ));
  };

  renderWords = () => {
    const renderedLetters = this.renderLetters();
    return renderedLetters;
  };

  renderLetters = () => {
    return this.state.originalText.split('').map((char, index) => {
      const classList = ['character'];
      const { typedText } = this.state;
      const typedChar = this.state.typedText[index];

      if (typedText.length > 0 && !!typedText[index]) {
        if (typedChar === char) {
          classList.push(this.state.results[index] < 2 ? 'fixed' : 'correct');
        } else {
          classList.push('incorrect');
        }
      }
      if (typedText.length === index) {
        classList.push('caret');
      }

      if (char === ' ') {
        return ' ';
      }

      return (
        <span className={classList.join(' ')}>
          {char !== ' ' ? char : <i>&nbsp;</i>}
        </span>
      );
    });
  };

  render() {
    const rendered = this.renderWordsRegex();
    console.log(this.renderWordsRegex());
    return (
      <div>
        <hr />
        <div className="text-container">{rendered}</div>
      </div>
    );
  }
}

export default KeyboardTracker;
