import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class ProximalQuery extends Component {

    handleClick = () => {
        const cityId = document.getElementById("proximal-id").value;
        const n = parseInt(document.getElementById("proximal-number").value);
        // let url = new URL('http://localhost:5000/proximal_query')
        // url.searchParams.append('id', cityId);
        // url.searchParams.append('n', n);
        let url = '/proximal_query?id=' + cityId + '&n=' + n
        fetch(url.pathname, { credentials: 'same-origin' }) // likely don't need same-origin credentials
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            this.props.updateCities(data.cities);
        })
        .catch(error => console.log(error)); // eslint-disable-line no-console
    }

    render() {
        return (
            <div>
                Proximal Query:
                <TextField
                    id="proximal-id"
                    label="City ID"
                    type="search"
                    margin="normal"
                />
                <TextField
                    id="proximal-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                    shrink: true,
                    }}
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={this.handleClick} > 
                    Search 
                </Button>
            </div>
        )
    }
}

export default ProximalQuery;