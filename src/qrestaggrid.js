import React from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

export default class QRest extends React.Component {
    state = {
        syms: [],
        stats: []
    }

    componentDidMount() {
        let config = {
            headers: {
                "Accept": "*/*",
                "Authorization": "Basic dXNlcjpwYXNz"
            }
          }

        const empty = {
            "query": "select percent:100*((last price)-first price)%last price,diff:(last price)-first price,lastPrice:last price by sym from trade where (\"d\"$time)=.z.d",
            "response": "true",
            "type": "sync"
        };

        axios.post(`https://localhost:8090/executeQuery`, empty, config)
        .then(res => {
            var tempData = res.data.result;
            /*
            for(var i in tempData) {
                var date = new Date(tempData[i].time);
                var hours = date.getHours();
                var minutes = "0" + date.getMinutes();
                var seconds = "0" + date.getSeconds();
                var ms = "00" + date.getMilliseconds();
                var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + '.' + ms.substr(-3);
                tempData[i].time = formattedTime;
            }*/
            var syms = [];
            var stats = [{},{},{}];
            for(var i in tempData) {
                syms.push({headerName: tempData[i].sym, field: tempData[i].sym, cellStyle: {color: 'red', 'background-color': 'green'}});
            }
            for(var j in tempData) {
                stats[0][tempData[j].sym] = tempData[j].diff;
                stats[1][tempData[j].sym] = tempData[j].percent;
                stats[2][tempData[j].sym] = tempData[j].lastPrice;
            }
            console.log(syms);
            console.log(stats);
            this.setState({syms,stats});
            console.log(this.state.syms);
            /*
            this.setState({ syms: rowDatacolumnDefs:[{
                headerName: "Time", field: "time"
            }],rowData });*/
        })
    }

    render() {
        return (
            <div 
                className="ag-theme-balham"
                style={{ 
                height: '500px', 
                width: '2000px' }} 
            >
                <AgGridReact
                    columnDefs={this.state.syms}
                    rowData={this.state.stats}>
                </AgGridReact>
            </div>
            /*<ul>
                { this.state.persons.map(person => <li>{person.b + person.a}</li>)}
            </ul>*/
        );
    }
}