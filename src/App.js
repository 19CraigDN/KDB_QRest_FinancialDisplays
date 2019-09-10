import React from 'react';
import logo from './UnknownFinance.PNG';
import './App.css';
import QRest_gw_max from './qrest_gw_max';
import QRest_gw from './qrest_gw';
import Tabs from './Tabs';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Test from './amtest.js';
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
              <Paper className={classes.paper}><Test indsym="`AAPL`GOOG`DELL`MSFT" /></Paper>
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
          After 'while, <em>Croc</em>!
        </div>
        <div label="Running Avg Price">

        </div>
        <div label="Price Weighted Volume">

        </div>
        <div label="Volatility">

        </div>
      </Tabs>
    </div>
  );
}

export default App;
