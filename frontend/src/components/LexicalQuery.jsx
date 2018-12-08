import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class LexicalQuery extends Component {

	handleClick = () => {
        const words = document.getElementById("lexical-text").value;
        let url = new URL('http://localhost:5000/lexical_query')
        url.searchParams.append('words', encodeURI(words))
        var options = {}
        fetch(url.pathname, { credentials: 'same-origin' })
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
                Lexical Query:
                <TextField
                    id="lexical-text"
                    label="Search field"
                    type="search"
                    margin="normal"
                /> 
                <Button variant="contained" color="primary" onClick={this.handleClick} > 
                    Search 
                </Button>
            </div>
        )
    }
}

export default LexicalQuery;