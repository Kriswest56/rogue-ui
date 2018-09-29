import React from 'react';
import LoginPage from './login/login';
import Board from './board/board'


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

    initBoard = (username) => {
        let board = <Board username={username} />

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