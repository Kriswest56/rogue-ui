import React from 'react';
import Board from '../board/board';
import 'bootstrap/dist/css/bootstrap.min.css';

class LoginPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            value:"",
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
                                            <input type="text" name="name" className = "form-control" value={this.state.value} onChange={this.handleChange} />
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
                                username={this.state.value}    
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
    }

    handleSubmit = () => {
        this.setState({nameChosen:true})
    }

    render() {
        let content = this.renderLoginPage()
        
        if (this.state.nameChosen){
            content = this.renderBoard()
        }

        return(
             <div>
                {content}
            </div>   
        );
    }

}
export default LoginPage;