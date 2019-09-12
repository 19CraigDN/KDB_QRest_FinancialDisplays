<<<<<<< HEAD
// This is for the gateway query, querying to TorQ stack gateway (port xxxx7)

=======
>>>>>>> origin
import React from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
<<<<<<< HEAD
import Table_Cell from './table_cell.js';

export default class QRest_gw extends React.Component {

    state = {
=======

export default class QRest_gw extends React.Component {
    state = {
        rows: [],
>>>>>>> origin
        newRows: [],
        classes: ""
    }
    
<<<<<<< HEAD
    blah() {
=======

    componentDidMount() {
>>>>>>> origin
        let config = {
            headers: {
                "Accept": "*/*",
                "Authorization": "Basic dXNlcjpwYXNz"
            }
          }

        const empty = {
<<<<<<< HEAD
            "query": "select percent:100*((last price)-first price)%last price,diff:(last price)-first price,lastPrice:last price by sym from trade where (\"d\"$time)=.z.d",
=======
            "query": "select max price by (\"d\"$time),sym from trade where (\"d\"$time) in 2019.09.03 2019.08.19",
>>>>>>> origin
            "response": "true",
            "type": "sync"
        };

        axios.post(`https://localhost:8090/executeQuery`, empty, config)
        .then(res => {
<<<<<<< HEAD
            let rows = res.data.result;
=======
            var rows = res.data.result;
            //rows.splice(rows.length / 2);
            console.log(rows);
            /*
            for (var i in rows){
                var date = new Date(rows[i].y[0]);
                var hours = date.getHours();
                var minutes = "0" + date.getMinutes();
                var seconds = "0" + date.getSeconds();
                var ms = "00" + date.getMilliseconds();
                var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + '.' + ms.substr(-3);
                rows[i].y[0] = formattedTime;
                rows[i].y.date = (new Date()).toLocaleDateString();
            }
            */
            // console.log(rows);
>>>>>>> origin
            const newRows = rows;
            this.setState({ newRows });
        })
    }
<<<<<<< HEAD

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
=======
    render() {
    

        return (
            <Paper className={this.state.classes.root}>
                <Table className={this.state.classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>date</TableCell>
                            {/*<TableCell align="right">time</TableCell>*/}
                            <TableCell align="right">sym</TableCell>
                            <TableCell align="right">max price</TableCell>
                            {/*<TableCell align="right">size</TableCell>
                            <TableCell align="right">stop</TableCell>
                            <TableCell align="right">cond</TableCell>
                            <TableCell align="right">ex</TableCell>*/}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.newRows.map(row => (
                            <TableRow key={row.time}>
                                <TableCell component="th" scope="row">
                                    {row.time}
                                </TableCell>
                                {/*<TableCell align="right">{row.time}</TableCell>*/}
                                <TableCell align="right">{row.sym}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                {/*<TableCell align="right">{row.y[3]}</TableCell>
                                <TableCell align="right">{row.y[4]}</TableCell>
                                <TableCell align="right">{row.y[5]}</TableCell>                           
                                <TableCell align="right">{row.y[6]}</TableCell>*/}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
>>>>>>> origin
        );
    }
}