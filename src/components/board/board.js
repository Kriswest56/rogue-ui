import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './board.css';
import BoardSquare from './boardSquare/boardSquare';
import {performAction} from '../../service/boardService';

let Sound = require('react-sound').default;
let sound = require('../../resources/sounds/exploring.mp3');
let fish = require('../../resources/images/fish.gif');

const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40; 
const DELETE = 88;

const PATH_LEFT = "left";
const PATH_UP = "up";
const PATH_RIGHT = "right";
const PATH_DOWN = "down";
const NO_MOVE = "none";

class Board extends React.Component {

    constructor(props) {
        super(props);

        let board = this.createBoard(this.props.board);

        this.state = {
            board: board,
            username: this.props.username, //must be lower case
            moveChosen: false,
            playerMoves: [NO_MOVE, NO_MOVE],
            move: NO_MOVE,
            fishAmount: 0
        }

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.actionHandler = this.actionHandler.bind(this);
        this.createBoard = this.createBoard.bind(this);
        this.displayMoveList = this.displayMoveList.bind(this);
    }

    /* istanbul ignore next */
    async componentDidUpdate(){
        this.state.moveChosen = false; // eslint-disable-line
        document.getElementById('move').innerHTML = 'none';

        if(this.state.playerMoves.length > 1){
            let move = this.state.playerMoves.shift(); // eslint-disable-line
            this.state.move = move; // eslint-disable-line
            this.state.playerMoves.push(NO_MOVE); // eslint-disable-line
        }
        
    }

    componentWillMount(){
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown.bind(this));
    }

    handleKeyDown(event) {

        if(!this.state.moveChosen || event.keyCode === DELETE){
            let prevent = true;
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

                case DELETE:
                    this.actionHandler(NO_MOVE);
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

    /**
     * This function will send a move to the server to be queued
     */
    /* istanbul ignore next */
    async actionHandler(direction) {
        if(!this.state.moveChosen){
            this.state.playerMoves.splice(1, 2, direction); // eslint-disable-line
            this.state.moveChosen = true; // eslint-disable-line
            document.getElementById('move').innerHTML = direction;
            // call rougelikeServer and perform movement
            performAction(this.state.username, direction);
        } 

        if(DELETE) {
            this.state.playerMoves.splice(1, 2, direction); // eslint-disable-line
            document.getElementById('move').innerHTML = direction;
            // call rougelikeServer and perform movement
            performAction(this.state.username, direction);
        }

    }

    createBoard(board) {
        // Iterate over rows
        let renderedBoard = board.map((boardRow, i) => {

            let row = boardRow.split("");

            // Iterate over pieces in the row
            row = row.map((boardPiece, j) => {

                if (j === 10 && i === 11) { boardPiece = '@';} // put player in center of the map

                return (
                    <div className="col-sm-1-custom" key={i + "-" + j}>
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

    displayMoveList() {
        return this.state.playerMoves.map((move, i) => {
            if(i === 0){
                return null;
            } else {
                return (
                    <div className="player-attr">
                        <div className="row">
                            <div className="col-sm-6">
                                <h3><b>Player: {this.state.username}</b></h3>
                            </div>
                            <div className="col-sm-6" />
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <h3><b>Next Move: <span id='move'>{move}</span></b></h3>
                            </div>
                            <div className="col-sm-6">
                                <img className="fish-img" src={fish} /> <label className="fish-inv">x {this.state.fishAmount}</label>
                            </div>
                        </div>
                    </div>
                );
            }
            
        });
    }

    render() {

        let board = this.createBoard(this.props.board);
        let moveList = this.displayMoveList();

        return (
            <div>
                <div >
                    <div className="board">
                        {board}
                    </div>
                </div>
                <div>
                    {moveList}
                </div>
                <Sound
                    url={sound}
                    playStatus={Sound.status.PLAYING}
                    loop={true}
                    volume={10}
                />
            </div>
            
        );
    }

}

export default Board;