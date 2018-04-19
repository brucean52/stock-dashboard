import React, { Component } from 'react';
import Search from './components/search';
import Summary from './components/summary';
import Chart from './components/chart';
import News from './components/news';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Stock Dashboard</h1>
        <Search/>
        <Summary/>
        <Chart/>
        <News/>
      </div>
    );
  }
}

export default App;
