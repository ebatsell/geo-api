import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ProximalQuery from './components/ProximalQuery.jsx';
import LexicalQuery from './components/LexicalQuery.jsx';
import Cities from './components/Cities.jsx';
import Typography from '@material-ui/core/Typography';

class App extends Component {
    constructor() {
        super();
        this.state = {
            cities: []
        }

        this.updateCities = this.updateCities.bind(this);
    }

    updateCities(newCities) {
        this.setState({cities: newCities});
    }

    render() {
        return (
            <div className="App">
                <Typography variant="h3" gutterBottom> Geography API by Evan </Typography>
                <ProximalQuery updateCities={this.updateCities} />
                <LexicalQuery updateCities={this.updateCities} />
                <Cities cities={this.state.cities} />
            </div>
        );
    }
}

export default App;
