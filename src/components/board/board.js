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

    constructor(props) {
        super(props);

        let board = this.createBoard(this.props.board);

        this.state = {
            board: board,
            username: this.props.username, //must be lower case
            moveChosen: false
        }
        this.handleKeyDown = (event) => {

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

        /**
         * This function will send a move to the server to be queued
         */
        this.actionHandler = async (direction) => {

            if(!this.state.moveChosen){
                // call rougelikeServer and perform movement
                await axios.get(`${baseUrl}/game/${this.state.username}/${direction}`)
                    .then(function (response) {
                        if (response.data && response.data.board) {
                            return response.data.board.split("\n");
                        }
                        return ["Error"];
                    })
                    .catch (function (error) {
                        console.log(error);
                        return ["Error"];
                    });

                this.state.moveChosen = true;

            } else {
                console.warn("Move already chosen");
            }

        }

        this.createBoard = (board) => {

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

        board = () => {
            let board = <div id="game">
                <div id="board" className="row">
                    <div className="col-sm-12">
                        <div className="board">
                            {this.state.board}
                        </div>
                    </div>
                </div>
            </div>

            return board;
        }
    }

    componentDidUpdate(){
        let board = this.createBoard(this.props.board);

        this.state.board = board;
        this.state.moveChosen = false;
    }

    componentWillMount(){
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown.bind(this));
    }


    render() {
        return (
            <div className="center">
                {this.state.board}
            </div>
        );
    }

}

export default Board;