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
        console.log(this.state);
    }

    componentDidMount(){
        this.createGraph();
    }

    createGraph(){
        let chart = am4core.create("chartdiv1", am4charts.XYChart);
        chart.hiddenState.properties.opacity = 0;
        chart.padding(0, 0, 0, 0);
        chart.zoomOutButton.disabled = true;

        var title = chart.titles.create();
        title.text = "Live Price for " + this.state.symbs.replace('`','');
        title.fontSize = 20;

        var label = chart.chartContainer.createChild(am4core.Label);
        label.text = "Live Price. Currency in GBP";
        label.fontSize = 11;
        label.align = "right";

        // Create axes
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 25;
        dateAxis.dateFormats.setKey("second", "[font-size:15]ss");
        dateAxis.periodChangeDateFormats.setKey("second", "[bold]h:mm a");
        dateAxis.periodChangeDateFormats.setKey("minute", "[bold]h:mm a");
        dateAxis.periodChangeDateFormats.setKey("hour", "[font-size:25]h:mm a");
        dateAxis.renderer.inside = true;
        dateAxis.renderer.axisFills.template.disabled = true;
        dateAxis.renderer.ticks.template.disabled = true;
        dateAxis.interpolationDuration = 500;
        dateAxis.rangeChangeDuration = 500;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.interpolationDuration = 500;
        valueAxis.rangeChangeDuration = 500;
        valueAxis.renderer.inside = true;
        valueAxis.renderer.minLabelPosition = 0.05;
        valueAxis.renderer.maxLabelPosition = 0.95;
        valueAxis.renderer.axisFills.template.disabled = true;
        valueAxis.renderer.ticks.template.disabled = true;

        // Create series
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "price";
        series.dataFields.dateX = "date";
        series.strokeWidth = 3;
        series.interpolationDuration = 500;
        series.defaultState.transitionDuration = 0;
        series.propertyFields.stroke = "color";

        chart.events.on("datavalidated", function () {
            dateAxis.zoom({ start: 1 / 15, end: 1.2 }, false, true);
        });



        document.addEventListener("visibilitychange", function() {
            if (document.hidden) {
                if (interval) {
                    clearInterval(interval);
                }
            }
            else {
                startInterval();
            }
        }, false);


        let config = {
            headers: {
                "Accept": "*/*",
                "Authorization": "Basic dXNlcjpwYXNz"
            }
          }

        const empty = {
            "query": "0!select avg price by sym, 0D00:00:01 xbar time from trade where sym in " + this.state.symbs + ", time within (\"p\"$.z.p-00:01:00;\"p\"$.z.p+00:02:00)",
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
        })
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
                "query": "-1#0!select avg price by sym, 0D00:00:01 xbar time from trade where sym in " + onlysym + ", time within (\"p\"$.z.p-00:00:30;\"p\"$.z.p+00:00:40)",
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
        }, 1000);

    }
    
    startInterval();

    // all the below is optional, makes some fancy effects

    // this makes date axis labels to fade out
    dateAxis.renderer.labels.template.adapter.add("fillOpacity", function (fillOpacity, target) {
        var dataItem = target.dataItem;
        return dataItem.position;
    })

    // need to set this, otherwise fillOpacity is not changed and not set
    dateAxis.events.on("validated", function () {
        am4core.iter.each(dateAxis.renderer.labels.iterator(), function (label) {
            label.fillOpacity = label.fillOpacity;
        })
    })

    // this makes date axis labels which are at equal minutes to be rotated
    dateAxis.renderer.labels.template.adapter.add("rotation", function (rotation, target) {
        var dataItem = target.dataItem;
        if (dataItem.date && dataItem.date.getTime() === am4core.time.round(new Date(dataItem.date.getTime()), "minute").getTime()) {
            target.verticalCenter = "middle";
            target.horizontalCenter = "left";
            return -90;
        }
        else {
            target.verticalCenter = "bottom";
            target.horizontalCenter = "middle";
            return 0;
        }
    })

        }
        render() {
            return (
                <div><div id="chartdiv1" style={{ width: "100%", height: "500px" }}></div>
                <div>
                <DropdownButton id="dropdown-basic-button" title="Choose Sym">
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
                </div>
            );
      }
}