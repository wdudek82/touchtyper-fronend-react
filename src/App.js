import React, { Component } from 'react';
import './App.css';
import MouseTracker from './components/MouseTracker';
import KeyboardTracker from './components/KeyboardTracker/KeyboardTracker';

class App extends Component {
  render() {
    return (
      <div className="App" style={{ height: '90vh' }}>
        <h1>Touchtyper (Prototype)</h1>
        <KeyboardTracker />
        {/* <MouseTracker /> */}
      </div>
    );
  }
}

export default App;
