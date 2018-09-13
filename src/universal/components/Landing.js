import React, { Component } from 'react';
import axios from 'axios';
const config = require('../../../config');

class Landing extends React.Component {

    constructor() {
        super();

        this.state = {
            tiles: []
        }

        axios.get('http://localhost:3000/game/username/')
            .then(function (response) {
                // handle success
                console.log(response.data);
                let board = response.data.split("\n");
                console.log(board);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    };

    render() {
        console.log("rendered");
        return (
            <div>
                <h1>Landing Page</h1>
            </div>
        );
    }

}

export default Landing;