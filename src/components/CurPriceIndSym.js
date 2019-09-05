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

        // Create series
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "visits";
        series.dataFields.dateX = "date";
        series.strokeWidth = 2;
        series.minBulletDistance = 10;
        series.tooltipText = "{valueY}";
        series.tooltip.pointerOrientation = "vertical";
        series.tooltip.background.cornerRadius = 20;
        series.tooltip.background.fillOpacity = 0.5;
        series.tooltip.label.padding(12,12,12,12);
        series.propertyFields.stroke = "color";

        // Add scrollbar
        chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX.series.push(series);

        // Add cursor
        
    
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.xAxis = dateAxis;
        chart.cursor.snapToSeries = series;

        let config = {
            headers: {
                "Accept": "*/*",
                "Authorization": "Basic dXNlcjpwYXNz"
            }
          }

        const empty = {
            "query": "0!select avg price by sym, 0D00:05:00 xbar time from trade where sym in " + this.props.indsym + ", time within (\"p\"$2019.09.02D00:00:00;\"p\"$2019.09.05D23:59:59)",
            "response": "true",
            "type": "sync"
        };
        var previousValue;
        var tempcolor = chart.colors.getIndex(0);
        axios.post(`https://localhost:8090/executeQuery`, empty, config)
        .then(res => {
            var gwData = res.data.result;
            console.log(gwData);
            //formats the JSON from qrest to an array of objects
            let stockChartValuesFunction = [];
            for (var key in gwData) {
                //commented out color change logic for now to implement more syms
                
                //logic to change color when price change negative
                if(key > 0){ 
                    if(previousValue <= gwData[key].price){
                        tempcolor = chart.colors.getIndex(0);
                    }
                    else {
                        tempcolor = chart.colors.getIndex(5);
                    };
                    stockChartValuesFunction[key-1].color = tempcolor;    
                }
                
                    stockChartValuesFunction.push({
                        date: gwData[key].time,
                        visits: gwData[key].price,
                    });
                    previousValue = gwData[key].price
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