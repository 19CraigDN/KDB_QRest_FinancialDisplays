import TableCell from '@material-ui/core/TableCell';
import React from 'react';

export default class Table_Cell extends React.Component {
    greenRed() {
        if (this.props.diff < 0) {
            return 'red';
        } else {
            return 'green';
        }
    }

    render() {
        return (
            <TableCell style={{backgroundColor:this.greenRed(), color: 'white',}} align="right">{this.props.lastPrice}</TableCell>
        );
    }
}