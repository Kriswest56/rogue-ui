import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './board.css';
import BoardSquare from './boardSquare/boardSquare';
import {performAction} from '../../service/boardService';

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

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.actionHandler = this.actionHandler.bind(this);
        this.createBoard = this.createBoard.bind(this);
    }

    /* istanbul ignore next */
    componentDidUpdate(){
        let board = this.createBoard(this.props.board);

        this.state.board = board; // eslint-disable-line
        this.state.moveChosen = false; // eslint-disable-line
    }

    componentWillMount(){
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown.bind(this));
    }

    handleKeyDown(event) {

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
    /* istanbul ignore next */
    async actionHandler(direction) {

        if(!this.state.moveChosen){
            // call rougelikeServer and perform movement
            performAction(this.state.username, direction);
            this.state.moveChosen = true; // eslint-disable-line
        } else {
            console.warn("Move already chosen");
        }

    }

    createBoard(board) {

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

    render() {
        return (
            <div className="center">
                {this.state.board}
            </div>
        );
    }

}

export default Board;