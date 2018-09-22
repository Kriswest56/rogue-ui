import React from 'react';
import Board from '../components/board/board';
import LoginPage from '../components/login/login';


import './landing.css';

class Landing extends React.Component {

    render() {
        return (
            <div id="landing">
                <div id="board">
                    <LoginPage />
                </div>
            </div>
        );
    }

}

export default Landing;