import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import axios from 'axios';
import './board.css';
import BoardSquare from './boardSquare/boardSquare';

const config = require("../../config.json");
let baseUrl = config.roguelikeServer.baseUrl;

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
        username: "kristoffer" //must be lower case
    }

    //login page to get username
    login = () => {}

    //timer to count down movement time
    timer = () => {}

    handleKeyDown = (event) => {
        
        //console.log(event.keyCode + " : " + event.key);
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

        board = await this.boardMapper(board);

        this.setState({
            board: board
        });
    }

    createBoard = async () => {

        let board = [""];

        // call rougelikeServer for board state and login
        board = await axios.get(`${baseUrl}/game/${this.state.username}/`)
            .then(function (response) {
                return response.data.split("\n")
            })
            .catch(function (error) {
                console.log(error);
                return ["Error"];
            });

        board = await this.boardMapper(board);

        this.setState({
            board: board
        });
    }

    boardMapper = (board) => {

        let key = 1;

        let renderedBoard = board.map((boardRow, i) => {

            let row = boardRow.split("");
            
            row = row.map((boardPiece) => {
                key++;
                return (
                    <div className="col-md-1" key={key}>
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

    render() {
        return (
            <div onKeyPress={this.handleKeyPress}>
                <h1>Board</h1>
                <div id="board">
                    <div className="jumbotron">
                        <div>
                            {this.state.board}
                        </div>
                    </div>
                </div>
                <div id="startButton">
                    <button onClick={this.createBoard} >Start</button> 
                </div>
            </div>
        );
    }

}

export default Board;