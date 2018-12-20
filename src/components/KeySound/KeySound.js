import React, { Component } from 'react';
import button from '../../assets/sounds/button.wav';
import error from '../../assets/sounds/error.wav';

class KeySound extends Component {
  render() {
    return (
      <div>
        <audio id="key1" className="key-correct" src={button} preload="auto" />
        <audio id="key2" className="key-correct" src={button} preload="auto" />
        <audio id="key3" className="key-correct" src={button} preload="auto" />
        <audio id="key4" className="key-correct" src={button} preload="auto" />
        <audio id="key5" className="key-correct" src={button} preload="auto" />
        <audio id="key6" className="key-correct" src={button} preload="auto" />

        <audio id="key7" className="key-incorrect" src={error} preload="auto" />
        <audio id="key8" className="key-incorrect" src={error} preload="auto" />
        <audio id="key9" className="key-incorrect" src={error} preload="auto" />
        <audio id="key10" className="key-incorrect" src={error} preload="auto" />
        <audio id="key11" className="key-incorrect" src={error} preload="auto" />
        <audio id="key12" className="key-incorrect" src={error} preload="auto" />
      </div>
    );
  }
}

export default KeySound;
