import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import TypingExercises from './components/TypingExercises/TypingExercises';
import TypingExercise from './components/TypingExercise/TypingExercise';

class App extends Component {
  render() {
    return (
      <div className="App" style={{ height: '90vh' }}>
        <nav
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 3rem',
            width: '100%',
            height: '4rem',
            background: 'black',
            color: 'white',
            fontWeight: 700,
          }}
        >
          <div className="brand">BRAND</div>
          <div>Ranking</div>
          <div>Users</div>
          <div>Exercises</div>
          <div>Account</div>
        </nav>

        <h1 className="main-header">TouchyTyper (Prototype)</h1>

        <Switch>
          <Route exact path="/" component={TypingExercises} />
          <Route path="/exercise/:id" component={TypingExercise} />
        </Switch>
      </div>
    );
  }
}

export default App;
