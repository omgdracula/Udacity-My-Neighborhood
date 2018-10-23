import React, { Component } from 'react';
import './App.css'
import MapArea from './MapArea'

class App extends Component {


  render() {

    return (
      <div className="App">
        <header className="App-header" tabIndex={0}>
          <h1 className="App-title">Welcome to My Neighborhood</h1>
          <span><i>Images and location descriptions provided by the Wikipedia API</i></span>
        </header>
        <MapArea />
      </div>
    );
  }
}

export default App;

