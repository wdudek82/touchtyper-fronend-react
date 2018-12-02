import React, { Component } from 'react';
import './KeyboardTracker.css';

class KeyboardTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      original:
        'This is only a test string. Some sample sentence to test whole application!:)',
      sentence: '',
    };
  }

  componentDidMount() {
    const root = document.querySelector('body');
    root.addEventListener('keydown', this.handleKeyPressed);
  }

  handleKeyPressed = (e) => {
    e.preventDefault();

    console.log('Window event: ', window.event);
    console.log('Key pressed => ', window.event.which, window.event.key);

    let updatedSentence;
    switch (window.event.keyCode) {
      case 8:
        updatedSentence = this.state.sentence.substring(
          0,
          this.state.sentence.length - 1,
        );
        break;
      case 13: // Enter
      case 9: // Tab
      case 16: // Shift
      case 17: // Ctrl
      case 18: // Alt
      case 20: // Backspace
      case 27: // Esc
        updatedSentence = this.state.sentence;
        break;
      default:
        updatedSentence = this.state.sentence + window.event.key;
    }

    this.setState(() => ({
      sentence: updatedSentence,
    }));
  };

  renderDiff = () => {
    return this.state.original.split('').map((char, index) => {
      const typedChar = this.state.sentence[index];
      let bgcolor = 'none';
      const errorFixed = '#fffa90';

      if (this.state.sentence.length > 0 && !!this.state.sentence[index]) {
        bgcolor = typedChar === char ? '#70ff81' : '#ff998a';
      }

      if (char !== 'ß') {
        return (
          <span
            key={`${char}_${index}`}
            className="character"
            style={{ background: bgcolor }}
          >
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
