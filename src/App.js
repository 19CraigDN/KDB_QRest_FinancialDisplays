import React from 'react';
import logo from './logo.svg';
import './App.css';
<<<<<<< Updated upstream
import QRest from './qrest';
=======
import QRest_gw_max from './qrest_gw_max';
>>>>>>> Stashed changes

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
<<<<<<< Updated upstream
        <QRest/>
=======
        <QRest_gw_max/>
>>>>>>> Stashed changes
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
