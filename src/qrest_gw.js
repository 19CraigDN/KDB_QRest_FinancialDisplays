// This is for the gateway query, querying to TorQ stack gateway (port xxxx7)

import React from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Table_Cell from './table_cell.js';

export default class QRest_gw extends React.Component {

    state = {
        newRows: [],
        classes: ""
    }
    
    blah() {
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
            let rows = res.data.result;
            const newRows = rows;
            this.setState({ newRows });
        })
    }

    componentDidMount() {
        this.interval = setInterval(() => this.blah(), 2000);
    }

    render() {
        return (
            <div>
                <p>Last Price by Sym</p>
                <Paper className={this.state.classes.root}>
                    <Table className={this.state.classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Sym</TableCell>
                                <TableCell align="right">Last Price</TableCell>
                                <TableCell align="right">Change</TableCell>
                                <TableCell align="right">Percent Change</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.newRows.map(row => (
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {row.sym}
                                    </TableCell>
                                    <TableCell align="right">{row.lastPrice.toFixed(2)}</TableCell>
                                    <Table_Cell diff={row.diff.toFixed(2)} percent="none"/>
                                    <Table_Cell diff={row.diff.toFixed(2)} percent={row.percent.toFixed(2)}/>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}