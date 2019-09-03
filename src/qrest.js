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
            "query": "-5#select from trade",
            "response": "true",
            "type": "sync"
        };

        axios.post(`https://localhost:8090/executeQuery`, empty, config)
        .then(res => {
            const rows = res.data.result;
            this.setState({ rows });
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
                        {this.state.rows.map(row => (
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