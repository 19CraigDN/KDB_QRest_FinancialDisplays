import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

/* const useStyles = makeStyles(theme => ({
    root: {
        width : '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',

    },
    table :{
        minWidth: 650,
    },
}));

*/

export default class QRest extends React.Component {
    state = {
        rows: [],
        newRows: [],
        classes: "" //useStyles()
    }
    

    componentDidMount() {
        let config = {
            headers: {
                "Accept": "*/*",
                "Authorization": "Basic dXNlcjpwYXNz"
            }
          }

        const empty = {
            "query": "-5#select from trade where sym = `MSFT, time within (\"p\"$2014.04.21D00:00:00;\"p\"$2014.04.21D23:59:59)",
            "response": "true",
            "type": "sync"
        };

        axios.post(`https://localhost:8090/executeQuery`, empty, config)
        .then(res => {
            var rows = res.data.result;
            console.log(rows);
            for (var i in rows){
                var date = new Date(rows[i].time);
                var hours = date.getHours();
                var minutes = "0" + date.getMinutes();
                var seconds = "0" + date.getSeconds();
                var ms = "00" + date.getMilliseconds();
                var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + '.' + ms.substr(-3);
                rows[i].time = formattedTime;
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
                            <TableRow key={row.date}>
                                <TableCell component="th" scope="row">
                                    {row.date}
                                </TableCell>
                                <TableCell align="right">{row.time}</TableCell>
                                <TableCell align="right">{row.sym}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right">{row.size}</TableCell>
                                <TableCell align="right">{row.stop}</TableCell>
                                <TableCell align="right">{row.cond}</TableCell>                           
                                <TableCell align="right">{row.ex}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}