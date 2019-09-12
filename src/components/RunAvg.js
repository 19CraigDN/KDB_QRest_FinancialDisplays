import React from 'react';
import '../App.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly.js";
import axios from 'axios';

am4core.useTheme(am4themes_kelly);
am4core.useTheme(am4themes_animated);

export default class App extends React.Component { 
    componentDidMount(){
        let chart = am4core.create("chartdiv", am4charts.XYChart);

        var title = chart.titles.create();
        title.text = "Running Average Prices";
        title.fontSize = 20;

        var label = chart.chartContainer.createChild(am4core.Label);
        label.text = "Delayed Price. Currency in GBP";
        label.fontSize = 11;
        label.align = "right";

        // Create axes
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 75;
        dateAxis.startLocation = 0.0;
        dateAxis.endLocation = 0.75;
        dateAxis.periodChangeDateFormats.setKey("day", "[font-size:25]d MMM");
        dateAxis.interpolationDuration = 10000;
        dateAxis.rangeChangeDuration = 0;
        dateAxis.tooltipDateFormat = "hh:mm:ss";


        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.interpolationDuration = 10000;
        valueAxis.rangeChangeDuration = 500;

        // Create multiple series
        var series;
        function createSeries(field, name) {
            series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = field;
            series.dataFields.dateX = "date";
            series.interpolationDuration = 500;
            series.name = name;
            series.tooltipText = "[font-size:15]{name}: [bold font-size:15]{valueY}[/]";
            series.strokeWidth = 3;
            return series;
        }
        // Create array of syms for creating multiple series
        var sym_array = this.props.indsym.symbs.split('`');
        sym_array.shift();
        for (var key in sym_array){
            createSeries(sym_array[key], sym_array[key]);
        }

        // Add scrollbar
        chart.scrollbarX = new am4core.Scrollbar();
        chart.numberFormatter.numberFormat = "#.##"

        // Add cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.xAxis = dateAxis;

        // Add legend
        chart.legend = new am4charts.Legend();

        let config = {
            headers: {
                "Accept": "*/*",
                "Authorization": "Basic dXNlcjpwYXNz"
            }
          }

        const ravg = {
            "query": "0!update price:avgs price by sym from select avg price by 0D00:05:00 xbar time, sym from trade where sym in " + this.props.indsym.symbs + ", time within (\"p\"$" + this.props.indsym.dates[0] + ";\"p\"$" + this.props.indsym.dates[1] + ")",
            "response": "true",
            "type": "sync"
        };

 
        axios.post(`https://localhost:8090/executeQuery`, ravg, config)
        .then(res => {
            var gwData = res.data.result;
            // Formats the JSON from qrest to an array of objects
            let stockChartValuesFunction = [];
            let i = 0;
            let j = 0;
            for (key = 0;key < gwData.length;key+=sym_array.length) {     
                    stockChartValuesFunction.push({
                        date: new Date(gwData[key].time),
                        [gwData[key].sym]: gwData[key].price,
                    });

                    for (i = 1; i < sym_array.length; i++) {
                        stockChartValuesFunction[j][gwData[key + i].sym] = gwData[key + i].price
                    }
                    j++
            }
        chart.data = stockChartValuesFunction;
        })

        var myUpdate = this.props.indsym.symbs;
        var dates = this.props.indsym.dates;
        let interval;
        function startInterval() {
        interval = setInterval(function() {

        let config = {
            headers: {
                "Accept": "*/*",
                "Authorization": "Basic dXNlcjpwYXNz"
            }
          }

        const empty = {
            "query": "-" + sym_array.length +"#0!update price:avgs price by sym from select avg price by 0D00:05:00 xbar time, sym from trade where sym in " + myUpdate + ", time within (\"p\"$" + dates[0] + ";\"p\"$" + dates[1] + ")",
            "response": "true",
            "type": "sync"
        };

        axios.post(`https://localhost:8090/executeQuery`, empty, config)
        .then(res => {
            var gwData = res.data.result;
            console.log(gwData);
            // Formats the JSON from qrest to an array of objects
            let stockChartValuesUpdate = [];
            let i = 0;
                    stockChartValuesUpdate.push({
                        date: new Date(gwData[sym_array.length].time),
                        [gwData[sym_array.length].sym]: gwData[sym_array.length].price,
                    });

                    for (i = 1; i < sym_array.length; i++) {
                        stockChartValuesUpdate[0][gwData[sym_array.length + i].sym] = gwData[sym_array.length + i].price
                    }
        chart.addData(stockChartValuesUpdate)
        })
    }, 305000);
    }
    startInterval();

}
        render() {
            return (
            <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
            );
      }
}