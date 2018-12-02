import React, { Component } from 'react';
import Cat from './Cat';

class MouseWithCat extends Component {
  state = {
    x: 0,
    y: 0,
  };

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  };

  render() {
    return (
      <div
        style={{ height: '100%', background: 'palevioletred' }}
        onMouseMove={this.handleMouseMove}
      >
        <Cat mouse={this.state} />
      </div>
    );
  }
}

export default MouseWithCat;
