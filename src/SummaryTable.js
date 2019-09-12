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

export default class App extends React.Component {
    state = {
        newRows: [],
        symbs: this.props.indsym.symbs,
        classes: ""
    }

    funcy(symbs){
        this.setState({symbs},()=>{
            this.updateGraph();
        });
        console.log(this.state);
    }

    componentDidMount() {
        this.interval = setInterval(() => this.updateGraph(), 2000);
    }

    updateGraph() {
        let config = {
            headers: {
                "Accept": "*/*",
                "Authorization": "Basic dXNlcjpwYXNz"
            }
        }

        const empty1 = {
            "query": "select currPrice: last price, volume:sum size,minPrice:min price,maxPrice:max price from trade where sym=" + this.state.symbs + ",(\"d\"$time)=.z.d",
            "response": "true",
            "type": "sync"
        };

        const empty2 = {
            "query": "select close:last price from trade where sym=" + this.state.symbs + ",(\"d\"$time)=.z.d-1,time<17:00:00",
            "response": "true",
            "type": "sync"
        }

        const empty3 = {
            "query": "select open:first price from trade where sym=" + this.state.symbs + ",(\"d\"$time)=.z.d,time>08:00:00",
            "response": "true",
            "type": "sync"
        }

        axios.post(`https://localhost:8090/executeQuery`, empty1, config)
            .then(res => {
                var newRows = [res.data.result[1]];
                axios.post(`https://localhost:8090/executeQuery`, empty2, config)
                .then(res => {
                    newRows[0].close = res.data.result[0].close;
                    axios.post(`https://localhost:8090/executeQuery`, empty3, config)
                    .then(res => {
                        newRows[0].open = res.data.result[1].open;
                        this.setState({ newRows });
                    })
                })
            })
    }

    render() {
        return (
            <div>
                <p>Summary table for {this.state.symbs.replace('`','')}</p>
                <Paper className={this.state.classes.root}>
                    <Table className={this.state.classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Current Price</TableCell>
                                <TableCell>Volume</TableCell>
                                <TableCell>Max Price</TableCell>
                                <TableCell>Min Price</TableCell>
                                <TableCell>Close</TableCell>
                                <TableCell>Open</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                {this.state.newRows.map(row => (
                                    <TableRow>
                                    <TableCell component="th" scope="row">
                                        {row.currPrice.toFixed(2)}
                                    </TableCell>
                                    <TableCell>{row.volume}</TableCell>
                                    <TableCell>{row.maxPrice.toFixed(2)}</TableCell>
                                    <TableCell>{row.minPrice.toFixed(2)}</TableCell>
                                    <TableCell>{row.close.toFixed(2)}</TableCell>
                                    <TableCell>{row.open.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </Paper>
                <div>
                <DropdownButton id="dropdown-basic-button" title="Choose Sym">
                        <Dropdown.Item onClick={() => this.funcy("`AAPL")}>AAPL</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.funcy("`AIG")}>AIG</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.funcy("`AMD")}>AMD</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.funcy("`DELL")}>DELL</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.funcy("`DOW")}>DOW</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.funcy("`GOOG")}>GOOG</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.funcy("`HPQ")}>HPQ</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.funcy("`IBM")}>IBM</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.funcy("`INTC")}>INTC</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.funcy("`MSFT")}>MSFT</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
        );
    }
}