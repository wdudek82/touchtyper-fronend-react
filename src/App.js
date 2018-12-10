import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import TypingExercises from './components/TypingExercises/TypingExercises';
import TypingExercise from './components/TypingExercise/TypingExercise';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App" style={{ height: '90vh' }}>
          <h1>TouchyTyper (Prototype)</h1>
          <Switch>
            <Route exact path="/" component={TypingExercises} />
            <Route path="/exercise/:id" component={TypingExercise} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
