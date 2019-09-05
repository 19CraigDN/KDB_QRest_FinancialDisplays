import React from 'react';
import './App.css';
import Test from './components/amtest2';

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
