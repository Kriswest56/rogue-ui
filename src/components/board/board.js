import React from 'react';
import axios from 'axios';

import './board.css';

const config = require("../../config.json");
let baseUrl = config.roguelikeServer.baseUrl;
let username = "kristoffer";

const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40; 

const PATH_LEFT = "left";
const PATH_UP = "up";
const PATH_RIGHT = "right";
const PATH_DOWN = "down";

class Board extends React.Component {

    constructor() {
        super();

        this.createBoard = this.createBoard.bind(this);
    }

    componentWillMount(){
        document.addEventListener("keydown", this.handleKeyDown.bind(this));

        //log in to game. //Refactor later for actual login screen
        //this.login();
    }
    
    
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown.bind(this));
    }

    state = {
        board: "", 
        allowKeyPress: true,
        lastTimePressed: Date.now()
    }

    login = async () => {}

    handleKeyDown = (event) => {
        
        //console.log(event.keyCode + " : " + event.key);
        switch( event.keyCode ) {

            case ARROW_LEFT:
                this.arrowHandler(PATH_LEFT);
                break;

            case ARROW_UP:
                this.arrowHandler(PATH_UP);
                break;

            case ARROW_RIGHT:
                this.arrowHandler(PATH_RIGHT);
                break;

            case ARROW_DOWN:
                this.arrowHandler(PATH_DOWN);
                break;

            default: 
                break;
        }

    }

    arrowHandler = async (direction) => {
        let board = "";

        // call rougelikeServer for board state
        board = await axios.get(`${baseUrl}/game/${username}/${direction}`)
            .then(function (response) {
                return response.data.split("\n")
            })
            .catch(function (error) {
                return "";
            });

        board = this.boardMapper(board);

        this.setState({
            board: board
        })
    }

    createBoard = async () => {

        let board = [];

        // call rougelikeServer and perform movement
        board = await axios.get(`${baseUrl}/game/${username}/`)
            .then(function (response) {
                return response.data.split("\n")
            })
            .catch(function (error) {
                return "";
            });

        board = this.boardMapper(board);

        this.setState({
            board: board
        })

    }

    boardMapper = (board) => {

        board = board.map((boardRow, i) =>{
            i++;
            return (
                <div key={i}>
                    {boardRow}
                </div>
            );
        });

        return board;
    }

    handleKeyPress = (event) => {
        //console.log(event.key);
    }

    render() {
        return (
            <div onKeyPress={this.handleKeyPress}>
                <h1>Board</h1>
                <div id="board">
                    {this.state.board}
                </div>
                <div id="startButton">
                    <button onClick={this.createBoard} >Start</button> 
                </div>
            </div>
        );
    }

}

export default Board;