import React from 'react';
import logo from './UnknownFinance.PNG';
import './App.css';
import QRest_gw_max from './qrest_gw_max';
import QRest_gw from './qrest_gw';
import Tabs from './Tabs';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Test from './components/MultiSym.js';
import IndSym from './components/IndSym.js';
import RunAvg from './components/RunAvg.js';
import Variance from './components/variance.js';
import Volume from './components/volumegraph.js';
require('./styles.css');

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

let inp={symbs:"`AAPL" , dates: [".z.d",".z.d+1"]}
let inp1={symbs: "`AAPL`GOOG`DELL`MSFT`AIG`AMD`DOW`HPQ`IBM`INTC", dates: [".z.d-1",".z.d+1"]}

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Tabs>
        <div label="Overview">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}><Test indsym={inp1} /></Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}><QRest_gw_max /></Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}><QRest_gw /></Paper>
            </Grid>
          </Grid>
        </div>
        <div label="Individual Sym">
          <IndSym indsym={inp}/>
        </div>
        <div label="Running Avg Price">
          <RunAvg indsym={inp1}/>
        </div>
        <div label="Price Weighted Volume">
          <Volume indsym={inp1}/>
        </div>
        <div label="Volatility">
          <Variance indsym={inp1}/>
        </div>
        <div label="Meet the Team">

        </div>
      </Tabs>
    </div>
  );
}

export default App;
