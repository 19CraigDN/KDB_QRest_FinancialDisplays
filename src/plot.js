import React from 'react';
//import Plot from 'react-plotly.js';
import Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from 'react-plotly.js/factory';

export default class App extends React.Component { 
        figure = {
          data: [{
              type: 'scatter',
              x: [1, 2, 3],
              y: [2, 6, 3],
              mode: 'lines+points',
              marker: {color: 'red'}
            }],
          layout: {width: 320, height: 240, title: 'A Fancy Plot'} 
        }
        Plot = createPlotlyComponent(Plotly); 
      render() {
          return (
        <this.Plot data={this.figure.data} layout={this.figure.layout} />
        )
    }
  }