import React from 'react';
import logo from './logo.svg';
import './App.css';
import QRest from './qrest';
import Test from './components/amtest2';
import CPG from './components/CurrentPriceGraph.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <Test indsym="`AAPL`MSFT`DELL"/>
      </header>
    </div>
  );
}

export default App;
