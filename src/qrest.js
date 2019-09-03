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
            "query": "select a from t",
            "response": "true",
            "type": "sync"
        };

        axios.post(`https://localhost:8090/executeQuery`, empty, config)
        .then(res => {
            const rowData = res.data.result;
            this.setState({ columnDefs:[{
                headerName: "A", field: "a"
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