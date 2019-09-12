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

    correctAttr(){
        if(this.props.percent==="none") {
            return this.props.diff;
        }
        else
        {
            return this.props.percent;
        }
    }

    render() {
        return (
            <TableCell style={{color: this.greenRed(),}} align="right">{this.correctAttr()}</TableCell>
        );
    }
}