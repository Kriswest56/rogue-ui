import React from 'react';
import LoginPage from './login/login';
import Board from './board/board'
import Timer from './timer/timer'

import 'bootstrap/dist/css/bootstrap.min.css';
import './landing.css';

class Landing extends React.Component {

    state = {
        username: "",
        countdown: 0,
        gameStarted: false
    }

    setUserName = (username) => {
        this.setState({
            username: username
        })
    }

    gameStarted = (countdown, gameStarted) => {
        this.setState({
            gameStarted: gameStarted,
            countdown: countdown
        })
    }

    sendMoves = (message) => {
        console.log(message);
    }

    initBoard = (username) => {
        let board = (
            <div className="container">
                <div className="row">
                    <div className="col-sm-2" />
                    <div className="col-sm-8">
                        <Board 
                            username={username}
                            gameStarted={this.gameStarted}
                        />
                    </div>
                    <div className="col-sm-2" />
                </div>
                {this.startTimer()}
            </div>
            );

        return board;
    }

    startTimer = () => {
        if(this.state.gameStarted){
            return (
                <div className="row">
                    <div className="col-sm-4" />
                    <div className="col-sm-4">
                        <Timer 
                            sendMoves={this.sendMoves}
                            countdown={this.state.countdown}
                        />
                    </div>
                    <div className="col-sm-4" />
                </div>
            );
        }
    }

    initLogin = () => {
        let login = <LoginPage setUserName={this.setUserName} />

        return login;
    }

    render() {
        let username = this.state.username;
        let content = "";

        if(username !== ""){
            content = this.initBoard(username);
        } else {
            content = this.initLogin();
        }

        return (
            <div id="landing">
                {content}
            </div>
        );
    }

}

export default Landing;