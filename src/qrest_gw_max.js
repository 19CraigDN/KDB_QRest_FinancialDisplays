// For max price and volume from max to min

import React from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'

export default class QRest_gw_max extends React.Component {
    state = {
        newRows: [],
        classes: ""
    }

    componentDidMount() {
        this.updateGraph();
    }

    updateGraph() {
        let config = {
            headers: {
                "Accept": "*/*",
                "Authorization": "Basic dXNlcjpwYXNz"
            }
        }

        const empty = {
            "query": "`volume xdesc select volume:sum size,minPrice:min price,maxPrice:max price by (\"d\"$time),sym from trade where (\"d\"$time) in .z.d",
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

    updateGraph2() {
        let config = {
            headers: {
                "Accept": "*/*",
                "Authorization": "Basic dXNlcjpwYXNz"
            }
        }

        const empty = {
            "query": "`volume xdesc select volume:sum size,minPrice:min price,maxPrice:max price by (\"d\"$time)in (.z.d;.z.d-1),sym from trade where (\"d\"$time) in (.z.d;.z.d-1)",
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

    updateGraph3() {
        let config = {
            headers: {
                "Accept": "*/*",
                "Authorization": "Basic dXNlcjpwYXNz"
            }
        }

        const empty = {
            "query": "`volume xdesc select volume:sum size,minPrice:min price,maxPrice:max price by (\"d\"$time)in (.z.d;.z.d-1;.z.d-2),sym from trade where (\"d\"$time) in (.z.d;.z.d-1;.z.d-2)",
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

    render() {
        return (
            <div>
                <p>Max and Min Prices by Highest Traded Sym</p>
                <Paper className={this.state.classes.root}>
                    <Table className={this.state.classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Sym</TableCell>
                                <TableCell align="right">Volume</TableCell>
                                <TableCell align="right">Max Price</TableCell>
                                <TableCell align="right">Min Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.newRows.map(row => (
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {row.sym}
                                    </TableCell>
                                    <TableCell align="right">{row.volume}</TableCell>
                                    <TableCell align="right">{row.maxPrice.toFixed(2)}</TableCell>
                                    <TableCell align="right">{row.minPrice.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <DropdownButton id="dropdown-basic-button" title="Choose Date Range">
                        <Dropdown.Item onClick={() => this.updateGraph()}>Current Day</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.updateGraph2()}>Last Two Days</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.updateGraph3()}>Last Three Days</Dropdown.Item>
                    </DropdownButton>
                </Paper>
            </div>
        );
    }
}