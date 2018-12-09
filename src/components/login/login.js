import React from 'react';
import {requestData} from '../../service/boardService';
import Board from '../board/board';

import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'

const ENTER = 13;

class LoginPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: "",
            nameChosen: false,
        }

        this.loginForm = this.loginForm.bind(this);
        this.renderBoard = this.renderBoard.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentWillMount(){
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown.bind(this));
    }

    handleKeyDown(event) {
        if(!this.state.nameChosen) {
            let prevent = true;
            switch( event.keyCode ) {

                case ENTER:
                    this.handleSubmit();
                    break;

                default:
                    prevent = false;
                    break;
            }
            if (prevent) {
                event.preventDefault();
            }
        }
    }

    loginForm() {
        let loginForm = (

            <div id="loginForm" className="login-form-style">
                <div className = "row">
                    <div className = "col-sm-12">
                        <div className="center">
                            <form className = "form-horizontal">
                                <label className = "control-label">
                                    <input type="text" name="name" placeholder="Choose Name" className = "form-control form-control" value={this.state.username} onChange={this.handleChange} />
                                </label>
                            </form>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <div className = "row">
                    <div className = "col-sm-12">
                        <div className="center">
                            <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>START</button>
                        </div>
                    </div>
                </div>
            </div>
        );

        return loginForm
    }

    renderBoard() {
        let renderBoard =<div id="board">
            <Board
                username={this.state.username}
            />
        </div>

        return renderBoard
    }

    handleChange(event) {
        this.setState({
            username: event.target.value
        });
    }

    async handleSubmit() {
        let boardResp = await requestData(this.state.username);
        
        this.props.setUserName(this.state.username, boardResp);

        this.state.nameChosen = true;
    }

    render() {
        return(
             <div>
                <div onKeyPress = {this.handleKeyPress}>
                    {this.loginForm()}
                    <br />
                </div>
            </div>   
        );
    }

}
export default LoginPage;