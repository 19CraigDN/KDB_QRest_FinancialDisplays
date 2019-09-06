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
        rows: [],
        newRows: [],
        classes: "",
        empty: {
            "query": "`volume xdesc select volume:sum size,minPrice:min price,maxPrice:max price by (\"d\"$time),sym from trade where (\"d\"$time) in 2019.09.04",
            "response": "true",
            "type": "sync"
        }
    }
    
    componentDidMount() {
        let config = {
            headers: {
                "Accept": "*/*",
                "Authorization": "Basic dXNlcjpwYXNz"
            }
          }

        const empty = {
            "query": "`volume xdesc select volume:sum size,minPrice:min price,maxPrice:max price by (\"d\"$time),sym from trade where (\"d\"$time) in 2019.09.04",
            "response": "true",
            "type": "sync"
        };

        axios.post(`https://localhost:8090/executeQuery`, this.state.empty, config)
        .then(res => {
            var rows = res.data.result;
            const newRows = rows;
            this.setState({ newRows });
        })
    }

    render() {
    

        return (
            <div>
                <p>Title</p>
            <Paper className={this.state.classes.root}>
                <DropdownButton id="dropdown-basic-button" title="Dropdown button">
  <Dropdown.Item >Some action</Dropdown.Item>
  <Dropdown.Item >Another action</Dropdown.Item>
  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
</DropdownButton>
                <Table className={this.state.classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>date</TableCell>
                            <TableCell align="right">Sym</TableCell>
                            <TableCell align="right">Volume</TableCell>
                            <TableCell align="right">Max Price</TableCell>
                            <TableCell align="right">Min Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.newRows.map(row => (
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    {row.time}
                                </TableCell>
                                <TableCell align="right">{row.sym}</TableCell>
                                <TableCell align="right">{row.volume}</TableCell> 
                                <TableCell align="right">{row.maxPrice.toFixed(2)}</TableCell>
                                <TableCell align="right">{row.minPrice.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            </div>
        );
    }
}