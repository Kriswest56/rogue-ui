import React from 'react';
import Board from '../components/board/board'

import './landing.css';

class Landing extends React.Component {

    render() {
        return (
            <div>
                <h1>Landing Page</h1>
                <div id="board">
                    <Board />
                </div>
            </div>
        );
    }

}

export default Landing;