import React, { Component } from 'react';
import './KeyboardTracker.css';

class KeyboardTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      original:
        'This is only a test string. Some sample sentence to test whole application!:)',
      sentence: '',
      results: [],
    };
  }

  componentDidMount() {
    const root = document.querySelector('body');
    root.addEventListener('keydown', this.handleKeyPressed);
  }

  handleKeyPressed = (e) => {
    console.log('Window event: ', window.event);
    console.log('Key pressed => ', window.event.which, window.event.key);

    let updatedSentence = this.state.sentence;
    switch (window.event.keyCode) {
      case 8:
        updatedSentence = this.state.sentence.substring(
          0,
          this.state.sentence.length - 1,
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

        if (this.state.sentence.length < this.state.original.length) {
          updatedSentence = this.state.sentence + window.event.key;
        } else {
          updatedSentence = this.state.sentence;
        }
      }
    }

    this.setState(() => ({
      sentence: updatedSentence,
    }));
  };

  renderDiff = () => {
    return this.state.original.split('').map((char, index) => {
      const classList = ['character'];
      const { sentence } = this.state;
      const typedChar = this.state.sentence[index];

      if (sentence.length > 0 && !!sentence[index]) {
        if (typedChar === char) {
          classList.push(this.state.results[index] < 2 ? 'fixed' : 'correct');
        } else {
          classList.push('incorrect');
        }
      }
      if (this.state.sentence.length === index) {
        classList.push('caret');
      }

      if (char !== 'ß') {
        return (
          <span key={`${char}_${index}`} className={classList.join(' ')}>
            {char !== ' ' ? char : <i>&nbsp;</i>}
          </span>
        );
      }
      return <br />;
    });
  };

  render() {
    return (
      <div>
        <hr />
        <div className="text-container">{this.renderDiff()}</div>
      </div>
    );
  }
}

export default KeyboardTracker;
