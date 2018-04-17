import React, { Component } from 'react';
import Search from './components/search';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Stock Dashboard</h1>
        <Search/>
      </div>
    );
  }
}

export default App;
