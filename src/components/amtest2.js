import React from 'react';
import '../App.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark.js";
import axios from 'axios';

am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

export default class App extends React.Component { 
    componentDidMount(){
        let chart = am4core.create("chartdiv", am4charts.XYChart);

        // Create axes
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 50;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        // Create multiple series
        var series;
        function createSeries(field, name) {
            series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = field;
            series.dataFields.dateX = "date";
            series.name = name;
            series.tooltipText = "[font-size:20]{name}: [bold][font-size:20]£{valueY}[/]";
            //series.tooltipText[font-size].fontsize = ;

            series.strokeWidth = 2;
            //console.log[series];
            //console.log[series.tooltipText]
            return series;
        }
        // Create array of syms for creating multiple series
        var sym_array = this.props.indsym.split('`');
        sym_array.shift();
        console.log(sym_array);
        for (var key in sym_array){
            createSeries(sym_array[key], sym_array[key]);
        }

        // Add scrollbar
        // Normal scrollbar
        chart.scrollbarX = new am4core.Scrollbar();
        // Scrollbar with timeseries
        //chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.dateFormatter.inputDateFormat = "yyyy-MM-dd"
        chart.numberFormatter.numberFormat = "#.##"
        //chart.scrollbarX.series.push(series);

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
            "query": "0!select avg price by 0D00:05:00 xbar time, sym from trade where sym in " + this.props.indsym + ", time within (\"p\"$2019.09.02D00:00:00;\"p\"$2019.09.05D23:59:59)",
            "response": "true",
            "type": "sync"
        };
        var previousValue;
        var tempcolor = chart.colors.getIndex(0);
        console.log(sym_array.length);
        axios.post(`https://localhost:8090/executeQuery`, empty, config)
        .then(res => {
            var gwData = res.data.result;
            console.log(gwData);
            //formats the JSON from qrest to an array of objects
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
        console.log(stockChartValuesFunction)
 
        })

        }
        render() {
            return (
            <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
            );
      }
}