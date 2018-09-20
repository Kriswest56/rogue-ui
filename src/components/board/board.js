import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import axios from 'axios';
import './board.css';
import BoardSquare from './boardSquare/boardSquare';

const config = require("../../config.json");
const baseUrl = config.roguelikeServer.baseUrl;

const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40; 

const PATH_LEFT = "left";
const PATH_UP = "up";
const PATH_RIGHT = "right";
const PATH_DOWN = "down";

class Board extends React.Component {

    componentWillMount(){
        document.addEventListener("keydown", this.handleKeyDown.bind(this));

        // TODO: log in to game. Refactor later for actual login screen
        // this.login();
    }
    
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown.bind(this));
    }

    state = {
        board: [""], 
        username: "abc" //must be lower case
    }

    //login page to get username
    login = () => {}

    //timer to count down movement time
    timer = () => {}

    handleKeyDown = (event) => {
        
        switch( event.keyCode ) {

            case ARROW_LEFT:
                this.actionHandler(PATH_LEFT);
                break;

            case ARROW_UP:
                this.actionHandler(PATH_UP);
                break;

            case ARROW_RIGHT:
                this.actionHandler(PATH_RIGHT);
                break;

            case ARROW_DOWN:
                this.actionHandler(PATH_DOWN);
                break;

            default: 
                break;
        }
    }

    actionHandler = async (direction) => {
        let board = [""];

        // call rougelikeServer and perform movement
        board = await axios.get(`${baseUrl}/game/${this.state.username}/${direction}`)
            .then(function (response) {
                return response.data.split("\n")
            })
            .catch(function (error) {
                console.log(error);
                return ["Error"];
            });

        board = this.createBoard(board);

        this.setState({
            board: board
        });
    }

    start = async () => {

        let board = [""];

        // call rougelikeServer for board state and login
        let boardResp = await axios.get(`${baseUrl}/game/${this.state.username}/`)
            .then(function (response) {
                return response.data.split("\n")
            })
            .catch(function (error) {
                console.log(error);
                return ["Error"];
            });

        // generate board
        board = this.createBoard(boardResp);

        this.setState({
            board: board
        });
    }

    createBoard = (board) => {

        let key = 1;
        // Iterate over rows
        let renderedBoard = board.map((boardRow, i) => {

            let row = boardRow.split("");
            
            // Iterate over pieces in the row
            row = row.map((boardPiece) => {
                key++;
                return (
                    <div className="col-sm-1-custom" key={key}>
                        <BoardSquare 
                            boardPiece={boardPiece}
                        />
                    </div>
                );
            });

            let renderedRow = <div key={i} className="row">
                                    {row}
                                </div>

            return renderedRow;
    
        });

        return renderedBoard;         
    }
    
    header = () => {
        let header = <div id="header" className="row">
                        <div className="col-sm-12">
                            <div id="header" className="jumbotron">
                                <h1 className="header-style">ROUGELIKE</h1>
                            </div>
                        </div>
                    </div>

        return header;
    }

    board = () => {
        let board = <div id="board" className="row">
                        <div className="col-sm-4"></div>
                        <div className="col-sm-4">
                            <div>
                                <div>
                                    {this.state.board}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4"></div>
                    </div>

        return board;
    }

    footer = () => {
        let footer = <div id="footer" className="row">
                        <div className="col-sm-4"></div>
                        <div className="col-sm-4">
                            <div id="startButton">
                                <button className="btn btn-primary button-style" onClick={this.start} >Start</button> 
                            </div>
                        </div>
                        <div className="col-sm-4"></div>
                    </div>

        return footer
    }

    render() {
        return (
            <div onKeyPress={this.handleKeyPress}>
                {this.header()}
                <br />
                {this.board()}
                <br />
                {this.footer()}
            </div>
        );
    }

}

export default Board;