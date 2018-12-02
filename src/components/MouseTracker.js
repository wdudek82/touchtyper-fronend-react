import React, { Component } from 'react';
import Mouse from './Mouse';
import Cat from './Cat';

class MouseTracker extends Component {
  render() {
    return (
      <div style={{ height: '100%', cursor: 'none' }}>
        <h1>Move the mouse around!</h1>
        <Mouse render={(mouse) => <Cat mouse={mouse} />}>
          {(mouse) => <Cat mouse={mouse} />}
        </Mouse>
      </div>
    );
  }
}

export default MouseTracker;
