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
            "query": "select from t",
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
                            <TableCell>a</TableCell>
                            <TableCell align="right">b</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.rows.map(row => (
                            <TableRow key={row.a}>
                                <TableCell component="th" scope="row">
                                    {row.a}
                                </TableCell>
                                <TableCell align="right">{row.b}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}