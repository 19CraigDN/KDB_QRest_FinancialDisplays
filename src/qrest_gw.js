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
            "query": "select max price by (\"d\"$time),sym from trade where (\"d\"$time) in 2019.09.03 2019.08.19",
            "response": "true",
            "type": "sync"
        };

        axios.post(`https://localhost:8090/executeQuery`, empty, config)
        .then(res => {
            var rows = res.data.result;
            //rows.splice(rows.length / 2);
            console.log(rows);
            
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
            
            // console.log(rows);
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
        );
    }
}