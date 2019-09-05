import React from 'react';
import logo from './logo.svg';
import './App.css';
import QRest from './qrest';
import Test from './components/amtest2.js';
import CPG from './components/CurrentPriceGraph.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
<<<<<<< HEAD
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
        <Test/> 
=======
        
        <Test indsym="`AAPL`GOOG`DELL`MSFT"/>
      {/*<CPG/><QRest/>*/}
>>>>>>> origin/Matthew
      </header>
    </div>
  );
}

export default App;
