import React from 'react';
import Board from '../board/board';

import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'

class LoginPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username:"",
            nameChosen: false,
        }
    }

    loginForm = () => {
        let loginForm = <div className = 'row'>
                            <div className = 'col-sm-4' />
                            <div className = 'col-sm-4'>
                                <div>
                                    <form className = "form-horizontal">
                                        <label className = "control-label">
                                            Username:
                                            <input type="text" name="name" className = "form-control" value={this.state.username} onChange={this.handleChange} />
                                        </label>
                                    </form>
                                </div>
                                <div>
                                    <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Play</button>
                                </div>
                            </div> 
                            <div className = 'col-sm-4' />
                        </div>

        return loginForm
    }

    header = () => {
        let header =<div className = 'row'>
                        <div className = 'col-sm-4' />
                        <div className = 'col-sm-4'>
                            <h3>Login</h3>
                        </div>
                        <div className = 'col-sm-4' />
                    </div>
        
        return header
    }

    renderBoard = () =>{
        let renderBoard =<div id="board">
                            <Board 
                                username={this.state.username}    
                            />
                        </div>

        return renderBoard
    }

    renderLoginPage = () => {
        let renderLoginPage =<div onKeyPress = {this.handleKeyPress}>
                                {this.header()}
                                <br />
                                {this.loginForm()}
                                <br />
                            </div>
        return renderLoginPage
    }

    handleChange = (event) => {
        this.setState({username: event.target.value});
    }

    handleSubmit = () => {
        this.props.setUserName(this.state.username);
    }

    render() {
        let content = this.renderLoginPage()

        return(
             <div>
                {content}
            </div>   
        );
    }

}
export default LoginPage;