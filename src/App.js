import React, { Component } from 'react';
import TypingExercise from './components/TypingExercise/TypingExercise';
import './App.css';

class App extends Component {
  state = {
    textOne: 'And finally, I came to the place where souls go to die. Where the mirrored and worn spirits fall into an endless sea of grey, mirrored glass... and I lowered myself within... and lay among them... and I almost did not return. And do you know what I found there? There, among the silent and battered shells of the innumerable? Peace. Enlightenment. Truth.',
  };

  render() {
    return (
      <div className="App" style={{ height: '90vh' }}>
        <h1>TouchyTyper (Prototype)</h1>
        <TypingExercise text={this.state.textOne} />
      </div>
    );
  }
}

export default App;
