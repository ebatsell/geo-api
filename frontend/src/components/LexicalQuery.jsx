import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class LexicalQuery extends Component {

	handleClick = () => {
        const words = document.getElementById("lexical-text").value;
        let url = '/lexical_query?words=' + encodeURI(words);
        // url.searchParams.append('words', encodeURI(words))
        var options = {}
        fetch(url, { credentials: 'same-origin' })
        .then((response) => {
            if (!response.ok) {
                console.log(response);
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
                            id="lexical-text"
                            label="Lexical Query"
                            defaultValue="City Name"
                            type="standard-helpertext"
                            margin="normal"
                        />
                    <Button variant="contained" color="primary" onClick={this.handleClick} > 
                        Search 
                    </Button>
                </Grid>
            </div>
        )
    }
}

export default LexicalQuery;