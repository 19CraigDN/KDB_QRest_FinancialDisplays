import React from 'react';
import logo from './logo.svg';
import './App.css';
import HelloWorld from './HelloWorld';
import HelloUser from './HelloUser';
import QRest from './qrest';
import CurrentPriceGraph from './components/CurrentPriceGraph.js';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <HelloWorld/>
        <HelloUser/>
        <CurrentPriceGraph/>
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
