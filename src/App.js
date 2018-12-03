import React, { Component } from 'react';
import './App.css';
import KeyboardTracker from './components/KeyboardTracker/KeyboardTracker';

class App extends Component {
  render() {
    return (
      <div className="App" style={{ height: '90vh' }}>
        <h1>TouchyTyper (Prototype)</h1>
        <KeyboardTracker />
        {/* <MouseTracker /> */}
      </div>
    );
  }
}

export default App;
