import React from 'react';
import axios from 'axios';
import Plot from 'react-plotly';

export default class CurrentPriceGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues: []
        }
    }
    
    state = {
        persons: []
    }

    componentDidMount() {
        const pointerToThis = this;
        let config = {
            headers: {
                "Accept": "*/*",
                "Authorization": "Basic dXNlcjpwYXNz"
            }
          }

        const empty = {
            "query": "0!select avg price, first sym by 1 xbar time.minute from trade where sym = `MSFT, time within (\"p\"$2019.09.03D00:00:00;\"p\"$2019.09.03D23:59:59)",
            "response": "true",
            "type": "sync"
        };
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];

        axios.post(`https://localhost:8090/executeQuery`, empty, config)
        .then(res => {
            const persons = res.data.result;
            this.setState({ persons })
            console.log(persons);
            for (var key in persons) {
                stockChartXValuesFunction.push(persons[key].minute.i);
                stockChartYValuesFunction.push(persons[key].price);
            }
            console.log(stockChartXValuesFunction)
            console.log(stockChartYValuesFunction)
            pointerToThis.setState({
                stockChartXValues: stockChartXValuesFunction,
                stockChartYValues: stockChartYValuesFunction
            });
        })
    }

    render() {
        return (
            <div>
                <h1>Stock Market</h1>
                <p>x-values: {this.state.stockChartXValues}</p>
                <p>y-values: {this.state.stockChartYValues}</p>
                
            </div>
        )
    }
}