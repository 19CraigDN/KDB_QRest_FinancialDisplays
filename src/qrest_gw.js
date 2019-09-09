// This is for the gateway query, querying to TorQ stack gateway (port xxxx7)

import React from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default class QRest_gw extends React.Component {
    state = {
        rows: [],
        newRows: [],
        classes: ""
    }
    

    componentDidMount() {
        let config = {
            headers: {
                "Accept": "*/*",
                "Authorization": "Basic dXNlcjpwYXNz"
            }
          }

        const empty = {
            "query": "-10#select from trade where time within (\"p\"$2019.09.04D00:00:00;\"p\"$2019.09.04D23:59:59)",
            "response": "true",
            "type": "sync"
        };

        axios.post(`https://localhost:8090/executeQuery`, empty, config)
        .then(res => {
            var rows = res.data.result;
            rows.splice(0,rows.length / 2);
            for (var i in rows){
                var date = new Date(rows[i].y[1]);
                var hours = date.getHours();
                var minutes = "0" + date.getMinutes();
                var seconds = "0" + date.getSeconds();
                var ms = "00" + date.getMilliseconds();
                var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + '.' + ms.substr(-3);
                rows[i].y[1] = formattedTime;
                rows[i].y.date = (new Date()).toLocaleDateString();
            }
            const newRows = rows;
            this.setState({ newRows });
        })
    }
    render() {
    

        return (
            <Paper className={this.state.classes.root}>
                <Table className={this.state.classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>date</TableCell>
                            <TableCell align="right">time</TableCell>
                            <TableCell align="right">sym</TableCell>
                            <TableCell align="right">price</TableCell>
                            <TableCell align="right">size</TableCell>
                            <TableCell align="right">stop</TableCell>
                            <TableCell align="right">cond</TableCell>
                            <TableCell align="right">ex</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.newRows.map(row => (
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    {row.y.date}
                                </TableCell>
                                <TableCell align="right">{row.y[1]}</TableCell>
                                <TableCell align="right">{row.y[2]}</TableCell>
                                <TableCell align="right">{row.y[3]}</TableCell>
                                <TableCell align="right">{row.y[4]}</TableCell>
                                <TableCell align="right">{row.y[5]}</TableCell>
                                <TableCell align="right">{row.y[6]}</TableCell>                           
                                <TableCell align="right">{row.y[7]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}