import React, { Component } from 'react';
// import logo from './logo.svg';
import './styles.css';
import SignInBar from './containers/SignInBar.js';
import Jumbotron from './containers/Jumbotron.js';
import CurrentItems from './containers/CurrentItems.js';

class App extends Component {
  render() {
    return (
      <div className="App">
      {this.props.children}
      </div>
    );
  }
}

export default App;
