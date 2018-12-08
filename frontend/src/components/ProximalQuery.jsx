import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class ProximalQuery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check: false
        }
        // this.handleChange = this.handleChange.bind(this)
    }


    handleChange = (event) => {
        this.setState({ check: event.target.checked });
    };

    handleClick = () => {
        const cityId = document.getElementById("proximal-id").value;
        const n = parseInt(document.getElementById("proximal-number").value);
        const countryLimit = this.state.check;
        let url = '/proximal_query?id=' + cityId + '&n=' + n + '&limit=' + countryLimit;
        fetch(url, { credentials: 'same-origin' }) // likely don't need same-origin credentials
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
                <Grid 
                    container
                    direction="row"
                    justify="center"
                    alignItems="baseline"
                >
                    <TextField
                        id="proximal-id"
                        label="Proximal Query"
                        defaultValue="City ID"
                        type="standard-helpertext"
                        margin="normal"
                    />
                    <TextField
                        id="proximal-number"
                        label="Number of Cities"
                        type="number"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        margin="normal"
                    />
                    <FormControlLabel
                        control={
                            <Switch 
                                color="primary"
                                checked={this.state.check}
                                onChange={this.handleChange}
                                value="checkSwitch"
                            />
                        }
                        label="Limit by Country"
                    />
                    <Button variant="contained" color="primary" onClick={this.handleClick} > 
                        Search 
                    </Button>
                </Grid>
            </div>
        )
    }
}

export default ProximalQuery;