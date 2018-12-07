import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class City extends Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.country}</TableCell>
                <TableCell>{this.props.segment}</TableCell>
                <TableCell numeric>{this.props.population}</TableCell>
                <TableCell numeric>{this.props.latitude}</TableCell>
                <TableCell numeric>{this.props.longitude}</TableCell>
                <TableCell numeric>{this.props.id}</TableCell>
            </TableRow>
            );
    }
}


export default City;