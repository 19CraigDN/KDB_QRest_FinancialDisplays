import React from 'react';
import logo from './logo.svg';
import './App.css';
import QRest from './qrest';
import FPlot from './plot.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <QRest/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <FPlot/>
      </header>
    </div>
  );
}

export default App;
