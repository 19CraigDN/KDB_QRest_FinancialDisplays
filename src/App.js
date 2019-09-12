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
import LiveData from './components/LiveData.js';
import SummaryTable from './SummaryTable.js';
import josh from './josh.jpg';
import matt from './matt.png';
import daniel from './daniel.jpg'
import craig from './craig.png'
import NewsFeed from './newsfeed.js'
require('./about_us.css');
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
              <Paper className={classes.paper}><Test indsym={inp1}/></Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}><QRest_gw_max/></Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}><QRest_gw/></Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}><NewsFeed/></Paper>
            </Grid>
          </Grid>
        </div>
        <div label="Individual Sym">
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper}><SummaryTable indsym={inp}/></Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}><LiveData indsym={inp}/></Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}><IndSym indsym={inp}/></Paper>
          </Grid>
        </Grid>
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
        <div label = "Meet The Team">
        <div>
    <h1 class="theteam">The Team</h1>
    <div class="column">
      <div class="card">
        <img src={craig}alt="Craig" style={{width:"100%"}} class="image"/>
        <div class="container">
          <h2>Craig</h2>
          <p class="title">Homeless of the Society</p>
          <p>Looking for a place to live in NY will pay rent with pounds pls give me an apartment.</p>
          <p>craig.neubieser@aquaq.co.uk</p>
          <p><button class="button"><a class ="contactcolor" href="mailto:craig.neubieser@aquaq.co.uk">Contact</a></button></p>
        </div>
      </div>
    </div>
  
    <div class="column">
      <div class="card">
        <img src={daniel} alt="Daniel" style={{width:"100%"}} class="image"/>
        <div class="container">
          <h2>Daniel</h2>
          <p class="title">CEO</p>
          <p>Allow me to re-introdcue myself. My name is HOV. CEO of the ROC Hov.</p>
          <p>daniel.lam@aqauq.co.uk</p>
          <p><button class="button"><a class ="contactcolor" href="mailto:daniel.lam@aquaq.co.uk">Contact</a></button></p>
        </div>
      </div>
    </div>
  
    <div class="column">
      <div class="card">
        <img src={josh} alt="Josh" style={{width:"100%"}} class="image"/>
        <div class="container">
          <h2>Josh</h2>
          <p class="title">HR department</p>
          <p>Organized social events for the group! 10/10! Big Nandos fan!</p>
          <p>josh.reid@aquaq.co.uk</p>
          <p><button class="button"><a class ="contactcolor" href="mailto:josh.reid@aquaq.co.uk">Contact</a></button></p>
        </div>
      </div>
    </div>

    <div class="column">
        <div class="card">
          <img src={matt} alt="Matt" style={{width:"100%"}} class="image"/>
          <div class="container">
            <h2>Matt</h2>
            <p class="title">Developer</p>
            <p>Mainly worked on populating the graphs of the project. The only quality member of the group.</p>
            <p>matt.moore@aquaq.co.uk</p>
            <p><button class="button"><a class ="contactcolor" href="mailto:matt.moore@aquaq.co.uk">Contact</a></button></p>
          </div>
        </div>
      </div>
  </div>
        </div>
      </Tabs>
    </div>
  );
}

export default App;
