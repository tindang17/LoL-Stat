import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './components/GetMatches';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome To LoL-Stat</h1>
        </header>
        <GetMatches />
      </div>
    );
  }
}

export default App;
