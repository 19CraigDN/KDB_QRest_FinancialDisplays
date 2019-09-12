import React from 'react';
import './App.css';
import Test from './components/IndSym.js';
let inp={symbs:"`MSFT" , dates: ["2019.09.10D00:00:00","2019.09.11D00:00:00"]}
inp.symbs += "`DELL"
inp.symbs = inp.symbs.replace("`MSFT","") 
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Test/>
      </header>
    </div>
  );
}

export default App;
