import React from 'react';
import '../App.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly.js";
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'

am4core.useTheme(am4themes_kelly);
am4core.useTheme(am4themes_animated);


export default class App extends React.Component { 
    
    state= {symbs:this.props.indsym.symbs, dates:this.props.indsym.dates}

    funcy(symbs){
        this.setState({symbs},()=>{
            this.createGraph();
        });
    }

    funcy2(date){
        this.setState({dates: [date,".z.d+1"]},()=>{
            this.createGraph();
        });
    }

    componentDidMount(){
        this.createGraph();
    }

    createGraph(){
        let chart = am4core.create("chartdiv", am4charts.XYChart);

        var title = chart.titles.create();
        title.text = "Price for " + this.state.symbs.replace('`','');
        title.fontSize = 20;

        var label = chart.chartContainer.createChild(am4core.Label);
        label.text = "Delayed Price. Currency in GBP";
        label.fontSize = 11;
        label.align = "right";

        // Create axes
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 75;
        dateAxis.periodChangeDateFormats.setKey("hour", "[font-size:25]d MMM");
        dateAxis.interpolationDuration = 100;
        dateAxis.rangeChangeDuration = 0;
        dateAxis.tooltipDateFormat = "hh:mm:ss";

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.interpolationDuration = 500;
        valueAxis.rangeChangeDuration = 500;
        // Create series
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "price";
        series.dataFields.dateX = "date";
        series.strokeWidth = 3;
        series.interpolationDuration = 500;
        series.defaultState.transitionDuration = 0;
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
            "query": "0!select avg price by sym, 0D00:05:00 xbar time from trade where sym in " + this.state.symbs + ", time within (\"p\"$" + this.state.dates[0] + ";\"p\"$" + this.state.dates[1] + ")",
            "response": "true",
            "type": "sync"
        };
        var previousValue;
        var tempcolor = chart.colors.getIndex(0);
        axios.post(`https://localhost:8090/executeQuery`, empty, config)
        .then(res => {
            var gwData = res.data.result;
            //formats the JSON from qrest to an array of objects
            let stockChartValuesFunction = [];
            for (var key in gwData) {
                
                //logic to change color when price change negative
                if(key > 0){ 
                    if(previousValue <= gwData[key].price){
                        tempcolor = am4core.color("green").brighten(0.5);
                    }
                    else {
                        tempcolor = am4core.color("red");
                    };
                    stockChartValuesFunction[key-1].color = tempcolor;    
                }
                
                    stockChartValuesFunction.push({
                        date: gwData[key].time,
                        price: gwData[key].price,
                    });
                    previousValue = gwData[key].price
            }
        chart.data = stockChartValuesFunction;
        //console.log(chart.data[chart.data.length - 1])
        })
        var dates = this.state.dates;
        var onlysym = this.state.symbs;
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
                "query": "-1#0!select avg price by sym, 0D00:00:10 xbar time from trade where sym in " + onlysym + ", time within (\"p\"$" + dates[0] + ";\"p\"$" + dates[1] + ")",
                "response": "true",
                "type": "sync"
            };
    
            axios.post(`https://localhost:8090/executeQuery`, empty, config)
            .then(res => {
                console.log("run")
                var gwData = res.data.result;
                let graphUpdate = [];
                 //logic to change color when price change negative
                 let previousValue = chart.data[chart.data.length - 1].price
                    if(previousValue <= gwData[1].price){
                        tempcolor = am4core.color("green").brighten(0.5);
                    }
                    else {
                        tempcolor = am4core.color("red");
                    };
                    chart.data[chart.data.length - 1].color = tempcolor
                    graphUpdate.push(chart.data[chart.data.length - 1]);
                    graphUpdate.push(
                        {
                        date: gwData[1].time,
                        price: gwData[1].price,
                        });
                    //chart.data.pop()
                    chart.addData(graphUpdate); 
            })
        }, 10000);

    }


    startInterval();
        }
    
        

        render() {
            return (
                <div><div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
            <div class="blah">
            <DropdownButton class="blah" id="dropdown-basic-button" title="Choose Sym">
                    <Dropdown.Item onClick={() => this.funcy("`AAPL")}>AAPL</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.funcy("`AIG")}>AIG</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.funcy("`AMD")}>AMD</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.funcy("`DELL")}>DELL</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.funcy("`DOW")}>DOW</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.funcy("`GOOG")}>GOOG</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.funcy("`HPQ")}>HPQ</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.funcy("`IBM")}>IBM</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.funcy("`INTC")}>INTC</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.funcy("`MSFT")}>MSFT</Dropdown.Item>
                </DropdownButton>
                </div>
                <div class="blah">
                    <DropdownButton class="blah" id="dropdown-basic-button" title="Choose Date">
                        <Dropdown.Item onClick={() => this.funcy2(".z.d")}>One Day</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.funcy2(".z.d-1")}>Two Days</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.funcy2(".z.d-2")}>Three Days</Dropdown.Item>
                    </DropdownButton>
            </div>
            </div>
            );
      }
}