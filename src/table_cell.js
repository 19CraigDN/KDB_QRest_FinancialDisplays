import TableCell from '@material-ui/core/TableCell';
import React from 'react';

export default class Table_Cell extends React.Component {
    greenRed = () => {
        console.log(this.props.lastPrice);
        if (this.props.diff < 0) {
            return <TableCell style={{backgroundColor:'red', color: 'white',}} align="right">{this.props.lastPrice}</TableCell>;
        } else {
            return <TableCell style={{backgroundColor:'green', color: 'white',}} align="right">{this.props.lastPrice}</TableCell>;
        }
    }

    render() {
        return (
            <div>{this.greenRed()}</div>
        );
    }
}