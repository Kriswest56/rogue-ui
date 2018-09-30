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
            </div>
            );

        return board;
    }

    startTimer = () => {
        console.log(this.state.gameStarted);
        if(this.state.gameStarted){
            return (
                <Timer 
                    sendMoves={this.sendMoves}
                    countdown={this.state.countdown}
                />
            );
        }
    }

    initLogin = () => {
        let login = <LoginPage setUserName={this.setUserName} />

        return login;
    }

    header = () => {
        let header = <div id="container" className="row jumbotron container-style">
                        <div className="col-sm-10">
                            <div id="header">
                                <label className="header-style">ROUGE</label>
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <div className="vertical-center timer-style">
                                {this.startTimer()}
                            </div>
                        </div>
                    </div>

        return header;
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
            <div id="landing" className="landing">
                <div className="container background">
                    {this.header()}
                    <br />
                    {content}
                </div>
            </div>
        );
    }

}

export default Landing;