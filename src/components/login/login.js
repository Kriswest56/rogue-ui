import React from 'react';
import axios from 'axios';

import Board from '../board/board';

import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'

const config = require('../../config.json');
const baseUrl = config.roguelikeServer.baseUrl;

class LoginPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: "",
            nameChosen: false,
        }
    }

    loginForm = () => {
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

    renderBoard = () =>{
        let renderBoard =<div id="board">
                            <Board 
                                username={this.state.username}    
                            />
                        </div>

        return renderBoard
    }

    handleChange = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    handleSubmit = async () => {

        let boardResp = await axios.get(`${baseUrl}/game/${this.state.username}/`)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
            return ["Error"];
        });
        
        this.props.setUserName(this.state.username, boardResp);
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