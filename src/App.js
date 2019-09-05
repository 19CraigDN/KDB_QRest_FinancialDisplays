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
        
        <Test indsym="`AAPL`GOOG`DELL`MSFT"/>
      {/*<CPG/><QRest/>*/}
      </header>
    </div>
  );
}

export default App;
