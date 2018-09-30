import React from 'react';
import LoginPage from './login/login';
import Board from './board/board'
import Timer from './timer/timer'

import 'bootstrap/dist/css/bootstrap.min.css';
import './landing.css';

class Landing extends React.Component {

    state = {
        username: ""
    }

    setUserName = (username) => {
        this.setState({
            username: username
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
                        />
                    </div>
                    <div className="col-sm-2" />
                </div>
                <div className="row">
                    <div className="col-sm-4" />
                    <div className="col-sm-4">
                        <Timer 
                            sendMoves={this.sendMoves}
                            countdown={5}
                        />
                    </div>
                    <div className="col-sm-4" />
                </div>
            </div>
            );

        return board;
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