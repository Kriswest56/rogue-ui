import React from 'react';
import LoginPage from './login/login';
import Board from './board/board';
import Timer from './timer/timer';
import {requestBoard} from '../service/boardService';

import 'bootstrap/dist/css/bootstrap.min.css';
import './landing.css';

class Landing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            countdown: 0,
            gameStarted: false,
            board: [""]
        }

        this.setUserName = this.setUserName.bind(this);
        this.getBoard = this.getBoard.bind(this);
        this.initBoard = this.initBoard.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.initLogin = this.initLogin.bind(this);
        this.header = this.header.bind(this);
    }

    setUserName(username, data) {
        let board = data.board ? data.board.split("\n") : ["Error"];
        let nextUpdate = data.nextUpdate ? data.nextUpdate : 5000;

        this.setState({
            username: username,
            board: board,
            gameStarted: true,
            nextUpdate: nextUpdate
        });
    }

    // This refreshes the board state every 5 seconds
    /* istanbul ignore next */
    async getBoard() {
        let board = await requestBoard(this.state.username);

        this.setState({
            username: this.state.username,
            board: board,
            gameStarted: true,
            countdown: 5
        });
    }

    initBoard(username) {
        let board = (
            <div className="container">
                <div className="row">
                    <div className="col-sm-2" />
                    <div className="col-sm-8 center">
                        <Board
                            username={username}
                            gameStarted={this.gameStarted}
                            board={this.state.board}
                        />
                    </div>
                    <div className="col-sm-2" />
                </div>
            </div>
        );

        return board;
    }

    startTimer() {
        if (this.state.gameStarted) {
            return (
                <Timer
                    getBoard={this.getBoard}
                    nextUpdate={this.state.nextUpdate}
                />
            );
        }
    }

    initLogin() {
        let login = <LoginPage
            setUserName={this.setUserName}
        />

        return login;
    }

    header() {
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