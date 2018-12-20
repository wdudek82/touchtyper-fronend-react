import React, { Component } from 'react';
import './MasterInput.css';

class MasterInput extends Component {
  componentDidMount() {
    const mastetInput = document.querySelector('#master-input');
    mastetInput.addEventListener('blur', () => {
      setTimeout(() => mastetInput.focus(), 1);
    });
  }

  render() {
    return (
      <input
        id="master-input"
        type="text"
        value={this.props.value}
        onChange={this.props.change}
        onKeyDown={this.props.keyDown}
        onKeyUp={this.props.keyUp}
        autoFocus={true}
        autoComplete="off"
      />
    );
  }
}

export default MasterInput;
