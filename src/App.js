import React from 'react';
import logo from './UnknownFinance.PNG';
import './App.css';
import QRest_gw_max from './qrest_gw_max';
import { render } from "react-dom";
import QRest_gw from './qrest_gw';
import Tabs from './Tabs';
require('./styles.css');


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" /> 
      </header>
      <Tabs>
        <div label="Table">
          <QRest_gw_max/>
          <QRest_gw/>
        </div>
        <div label="Something else">
          After 'while, <em>Croc</em>!
        </div>
      </Tabs>
    </div>
  );
}

export default App;
