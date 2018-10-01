import React from 'react';
import Board from '../board/board';
import 'bootstrap/dist/css/bootstrap.min.css';

import './login.css';

class LoginPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            value:"",
            nameChosen: false,
        }
    }

    loginForm = () => {
        let loginForm = <div className = 'row'>
                            <div className = 'col-sm-4'> </div>
                            <div className = 'col-sm-4'>
                            <div>
                                <form className = "form-horizontal" onSubmit={this.handleSubmit}>
                                    <label className = "control-label">
                                         Username:
                                        <input type="text" name="name" className = "form-control" value={this.state.value} onChange={this.handleChange} />
                                    </label>
                                   <button type = "button" className = "btn btn-default" onClick = {this.handleSubmit}> Submit </button>
                                </form>
                            </div>
                            </div> 
                            <div className = 'col-sm-4'> </div>
                        </div>
    return loginForm
    }

    header = () => {
        let header =<div className = 'row'>
                        <div className = 'col-sm-4'> </div>
                        <div className = 'col-sm-4'><div>Login</div></div>
                        <div className = 'col-sm-4'> </div>
                    </div>
                    return header
    }

    renderBoard = () =>{
        let renderBoard =<div id="board">
                            <Board 
                                username = {this.state.value}    
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
        this.setState({value: event.target.value});
        console.log(event.target.value)
    }

    handleSubmit = () => {
        this.setState({nameChosen:true})
        console.log(this.state.value)
    }

    render() {
        let content = this.renderLoginPage()
        if (this.state.nameChosen){
            content = this.renderBoard()
            console.log("nameChosen")
        }
        return(
             <div>{content}</div>   
            );
    }
}
export default LoginPage;