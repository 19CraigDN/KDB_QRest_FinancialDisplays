import React from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

export default class QRest extends React.Component {
    state = {
        columnDefs: [],
        rowData: []
    }

    componentDidMount() {
        let config = {
            headers: {
                "Accept": "*/*",
                "Authorization": "Basic dXNlcjpwYXNz"
            }
          }

        const empty = {
            "query": "select time from trades",
            "response": "true",
            "type": "sync"
        };

        axios.post(`https://localhost:8090/executeQuery`, empty, config)
        .then(res => {
            var tempData = res.data.result;
            for(var i in tempData) {
                var date = new Date(tempData[i].time);
                var hours = date.getHours();
                var minutes = "0" + date.getMinutes();
                var seconds = "0" + date.getSeconds();
                var ms = "00" + date.getMilliseconds();
                var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + '.' + ms.substr(-3);
                tempData[i].time = formattedTime;
            }
            const rowData = tempData;
            this.setState({ columnDefs:[{
                headerName: "Time", field: "time"
            }],rowData });
        })
    }

    render() {
        return (
            <div 
                className="ag-theme-balham"
                style={{ 
                height: '140px', 
                width: '210px' }} 
            >
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}>
                </AgGridReact>
            </div>
            /*<ul>
                { this.state.persons.map(person => <li>{person.b + person.a}</li>)}
            </ul>*/
        );
    }
}