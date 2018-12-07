import React, { Component } from 'react';
import City from './City.jsx';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class Cities extends Component {
	render() {
		const citiesToRender = this.props.cities.map((city) => <City {...city}/>)
		return (
			<Paper>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>City</TableCell>
							<TableCell>Country</TableCell>
							<TableCell>Country Segment</TableCell>
							<TableCell numeric>Population</TableCell>
							<TableCell numeric>Latitude</TableCell>
							<TableCell numeric>Longitude</TableCell>
							<TableCell numeric>Id</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{citiesToRender}
					</TableBody>
				</Table>	
			</Paper>			
		);
	}
}

export default Cities;