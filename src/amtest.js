import React from 'react';
import './App.css';
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
        series.strokeWidth = 3;
        series.minBulletDistance = 10;
        series.tooltipText = "{valueY}";
        series.tooltip.pointerOrientation = "vertical";
        series.tooltip.background.cornerRadius = 20;
        series.tooltip.background.fillOpacity = 0.5;
        series.tooltip.label.padding(12,12,12,12)
        series.propertyFields.stroke = "color"

        // Add scrollbar
        chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX.series.push(series);

        // Add cursor
        
    
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.xAxis = dateAxis;
        chart.cursor.snapToSeries = series;

        function generateChartData() {
            var chartData = [];
            var firstDate = new Date();
            firstDate.setDate(firstDate.getDate() - 1000);
            var visits = 1200;
            var previousValue;

            for (var i = 0; i < 500; i++) {
                // we create date objects here. In your data, you can have date strings
                // and then set format of your dates using chart.dataDateFormat property,
                // however when possible, use date objects, as this will speed up chart rendering.
                var newDate = new Date(firstDate);
                newDate.setDate(newDate.getDate() + i);
                
                visits += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);
                
                if(i > 0){
                    // add color to previous data item depending on whether current value is less or more than previous value
                    if(previousValue <= visits){
                        chartData[i - 1].color = chart.colors.getIndex(0);
                    }
                    else{
                        chartData[i - 1].color = chart.colors.getIndex(5);
                    }

                }    

                chartData.push({
                    date: newDate,
                    visits: visits,
                });
                previousValue= visits
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