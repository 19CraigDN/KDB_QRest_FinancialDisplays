import React from 'react';
import '../App.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dataviz.js";
import axios from 'axios';

am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

export default class MyTest extends React.Component { 
    componentDidMount(){
        let chart = am4core.create("chartdiv", am4charts.XYChart);

        // Create axes
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        // Set x-axis distance for times
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.minGridDistance = 75;
        dateAxis.dateFormats.setKey("second", "ss");
        dateAxis.periodChangeDateFormats.setKey("second", "[bold]h:mm a");
        dateAxis.periodChangeDateFormats.setKey("minute", "[bold]h:mm a");
        dateAxis.periodChangeDateFormats.setKey("hour", "[bold]h:mm a");
        dateAxis.renderer.inside = false;
        dateAxis.renderer.axisFills.template.disabled = true;
        dateAxis.renderer.ticks.template.disabled = true;

        /*chart.events.on("datavalidated", function () {
            dateAxis.zoom({ start: 14 / 15, end: 1.2 }, false, true);
        });
        */
        dateAxis.interpolationDuration = 10000;
        dateAxis.rangeChangeDuration = 0;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.interpolationDuration = 10000;
        valueAxis.rangeChangeDuration = 500;
        valueAxis.renderer.inside = true;
        valueAxis.renderer.minLabelPosition = 0.05;
        valueAxis.renderer.maxLabelPosition = 0.95;
        valueAxis.renderer.axisFills.template.disabled = true;
        valueAxis.renderer.ticks.template.disabled = true;

        // Create multiple series
        var series;
        function createSeries(field, name) {
            series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = field;
            series.dataFields.dateX = "date";
            series.name = name;
            series.tooltipText = "[font-size:20]{name}: [bold][font-size:20]£{valueY}[/]";
            series.strokeWidth = 2;
            return series;
        }
        // Create array of syms for creating multiple series
        var sym_array = this.props.indsym.split('`');
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

        const empty = {
            "query": "0!select avg price by 0D00:01:00 xbar time, sym from trade where sym in " + this.props.indsym + ", time within (\"p\"$2019.09.05D00:00:00;\"p\"$2019.09.10D23:59:59)",
            "response": "true",
            "type": "sync"
        };
        var myUpdate = this.props.indsym;
        axios.post(`https://localhost:8090/executeQuery`, empty, config)
        .then(res => {
            var gwData = res.data.result;
            console.log(gwData);
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
            "query": "-3#0!select avg price by 0D00:00:10 xbar time, sym from trade where sym in " + myUpdate + ", time within (\"p\"$2019.09.10D00:00:00;\"p\"$2019.09.10D23:59:59)",
            "response": "true",
            "type": "sync"
        };

        axios.post(`https://localhost:8090/executeQuery`, empty, config)
        .then(res => {
            var gwData = res.data.result;
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
    }, 10000);
}

startInterval();

    }
        render() {
            return (
            <div id="chartdiv" style={{ width: "75%", height: "500px" }}></div>
            );
      }
}