import React, { Component } from 'react';

class Mouse extends Component {
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
        The current mouse position is ({this.state.x}, {this.state.y})
        {this.props.children(this.state)}
      </div>
    );
  }
}

export default Mouse;
