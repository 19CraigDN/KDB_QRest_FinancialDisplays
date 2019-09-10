import React from 'react';
import './App.css';
import Test from './components/MultiSym.js';
let symbs="`AAPL`MSFT"
symbs += "`DELL"
symbs = symbs.replace("`MSFT","")
function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <Test indsym={symbs} />
      </header>
    </div>
  );
}

export default App;
