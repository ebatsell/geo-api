import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ProximalQuery from './components/ProximalQuery.jsx';
import LexicalQuery from './components/LexicalQuery.jsx';
import Cities from './components/Cities.jsx';

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
                <ProximalQuery updateCities={this.updateCities} />
                <LexicalQuery updateCities={this.updateCities} />
                <Cities cities={this.state.cities} />
            </div>
        );
    }
}

export default App;
