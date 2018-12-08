import React, { Component } from 'react';
import './KeyboardTracker.css';
import keyPressed from '../../assets/sounds/button.wav';
import ProgressBar from '../Layout/ProgressBar/ProgressBar';

class KeyboardTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalText:
        'And finally, I came to the place where souls go to die. Where the mirrored and worn spirits fall into an endless sea of grey, mirrored glass... and I lowered myself within... and lay among them... and I almost did not return. And do you know what I found there? There, among the silent and battered shells of the innumerable? Peace. Enlightenment. Truth.',
      typedText: '',
      mistakesIndexes: [],
      tokensLengthList: [],
      keysPressed: [],
    };
  }

  componentDidMount() {
    const root = document.querySelector('body');

    root.addEventListener('keydown', this.handleKeyDown);
    root.addEventListener('keyup', this.handleKeyUp);

    const tokensLengthList = this.createTokenLegthsList();
    this.setState((prevState) => ({
      tokensLengthList,
      mistakesIndexes: new Array(prevState.originalText.length),
    }));
  }

  handleKeyDown = (e) => {
    let { typedText } = this.state;
    const { keysPressed } = this.state;
    const { keyCode, key } = e;

    const audio = document.querySelectorAll('.keypressed-valid');

    if (!keysPressed.includes(keyCode) || keyCode === 8) {
      for (let i = 0; i < audio.length; i += 1) {
        if (audio[i].paused) {
          audio[i].play();
          break;
        }
      }

      switch (keyCode) {
        case 8: // Backspace
          e.preventDefault(); // in FF it's "Back"
          typedText = typedText.substring(0, this.state.typedText.length - 1);
          break;
        case 9: // Tab
        case 13: // Enter
        case 16: // Shift
        case 17: // Ctrl
        case 18: // Alt
        case 20: // CapsLock
        case 27: // Esc
        case 122: // F11
        case 123: // F12
          break;
        default: {
          e.preventDefault();

          if (typedText.length < this.state.originalText.length) {
            typedText += key;
          }
        }
      }

      // Allow auto-repeat when backspace pressed
      this.setState((prevState) => ({
        typedText,
        keysPressed: [...prevState.keysPressed, keyCode],
      }));
    }
  };

  handleKeyUp = (e) => {
    const { keyCode } = e;

    this.setState((prevState) => ({
      keysPressed: prevState.keysPressed.filter((key) => key !== keyCode),
    }));
  };

  createTokenLegthsList = () => {
    const pattern = /\W*\w+[\s\W]*/g;
    const partitionedText = this.state.originalText.match(pattern);
    return partitionedText.map((token) => token.length);
  };

  renderCharacters = () => {
    const { originalText, typedText, mistakesIndexes } = this.state;

    return originalText.split('').map((char, index) => {
      const classList = ['char'];

      if (typedText[index]) {
        if (typedText[index] === originalText[index]) {
          classList.push(mistakesIndexes[index] ? 'fixed' : 'correct');
        } else {
          classList.push('incorrect');

          if (mistakesIndexes[index] !== 1) {
            mistakesIndexes[index] = 1;
            this.setState(() => ({ mistakesIndexes }));
          }
        }
      }

      if (typedText.length === index) {
        classList.push('caret');
      }

      return <span className={classList.join(' ')}>{char}</span>;
    });
  };

  renderTokens = () => {
    const renderedSpans = this.renderCharacters();
    const { typedText } = this.state;
    let totalLength = 0;

    return this.state.tokensLengthList.map((tokenLength, index) => {
      const classList = ['token'];
      const start = index > 0 ? totalLength : 0;
      const end = tokenLength + totalLength;
      totalLength += tokenLength;

      if (typedText.length >= start && typedText.length < end) {
        classList.push('current');
      } else {
        classList.filter((c) => c !== 'current');
      }

      return (
        <span className={classList.join(' ')}>
          {renderedSpans.slice(start, end)}
        </span>
      );
    });
  };

  render() {
    const result = this.renderTokens();

    return (
      <div>
        <ProgressBar originalText={this.state.originalText} typedText={this.state.typedText} />
        {/*<div className="progress-container">*/}
          {/*<div className="progress-label">{progressMsg}</div>*/}
          {/*<progress value={completed} max="100" className="progress-bar" />*/}
        {/*</div>*/}
        <div className="text-container">{result}</div>
        <audio id="audio" className="keypressed-valid" controls style={{ display: 'none' }}>
          <source
            // src="http://butlerccwebdev.net/support/html5-video/media/soundfile.mp3"
            src={keyPressed}
            type="audio/mpeg"
          />{' '}
          Your browser does not support the audio element.
        </audio>
        <audio id="audio1" className="keypressed-valid" controls style={{ display: 'none' }}>
          <source
            // src="http://butlerccwebdev.net/support/html5-video/media/soundfile.mp3"
            src={keyPressed}
            type="audio/mpeg"
          />{' '}
          Your browser does not support the audio element.
        </audio>
        <audio id="audio2" className="keypressed-valid" controls style={{ display: 'none' }}>
          <source
            // src="http://butlerccwebdev.net/support/html5-video/media/soundfile.mp3"
            src={keyPressed}
            type="audio/mpeg"
          />{' '}
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }
}

export default KeyboardTracker;
