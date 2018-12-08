import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './board.css';
import BoardSquare from './boardSquare/boardSquare';
import {performAction} from '../../service/boardService';

let Sound = require('react-sound').default;
let sound = require('../../resources/sounds/exploring.mp3');
let fish = require('../../resources/images/fish.gif');
let lavaWand = require('../../resources/images/lava-wand.png');

const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40; 
const DELETE = 88;
const ITEM_SWITCH = 80;
const ITEM_LEFT = 65;
const ITEM_UP = 87;
const ITEM_RIGHT = 68;
const ITEM_DOWN = 83;

const PATH_LEFT = "left";
const PATH_UP = "up";
const PATH_RIGHT = "right";
const PATH_DOWN = "down";
const NO_MOVE = "none";

class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            board: '',
            username: this.props.username, //must be lower case
            moveChosen: false,
            playerMoves: [NO_MOVE, NO_MOVE],
            direction: {up: '', down: '', left: '', right: ''},
            move: NO_MOVE,
            fishAmount: 0,
            lavaWandAmount: 0,
            heldItem: 'nothing'
        }

        this.state.board = this.createBoard(this.props.board);

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.actionHandler = this.actionHandler.bind(this);
        this.createBoard = this.createBoard.bind(this);
        this.displayMoveList = this.displayMoveList.bind(this);
        this.switchHeldItem = this.switchHeldItem.bind(this);
        this.useItem = this.useItem.bind(this);
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

        if(!this.state.moveChosen || event.keyCode === DELETE || event.keyCode === ITEM_SWITCH){
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

                case ITEM_SWITCH:
                    this.switchHeldItem();
                    break;

                case ITEM_UP:
                    this.useItem(PATH_UP);
                    break;

                case ITEM_RIGHT:
                    this.useItem(PATH_RIGHT);
                    break;

                case ITEM_DOWN:
                    this.useItem(PATH_DOWN);
                    break;

                case ITEM_LEFT:
                    this.useItem(PATH_LEFT);
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

    switchHeldItem() {
        if(this.state.heldItem === 'nothing') {
            this.setState({heldItem: 'fish'});
            return;
        }

        if(this.state.heldItem === 'fish') {
            this.setState({heldItem: 'wand'});
            return;
        }

        if(this.state.heldItem === 'wand') {
            this.setState({heldItem: 'nothing'});
            return;
        }
    }

    useItem(direction) {
        if(this.state.heldItem === 'fish' && !this.state.moveChosen) {
            if (this.state.direction[direction] === '~') {
                this.state.fishAmount = this.state.fishAmount + 1; // eslint-disable-line
                this.state.moveChosen =true;  // eslint-disable-line
            }
        }
    }

    /**
     * This function will send a move to the server to be queued
     */
    /* istanbul ignore next */
    async actionHandler(direction) {
        if(!this.state.moveChosen){
            this.setState({
                move: direction
            });
            this.state.moveChosen = true; // eslint-disable-line
            // call rougelikeServer and perform movement
            performAction(this.state.username, direction);
        } 

        if(DELETE) {
            this.state.move = direction; // eslint-disable-line
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
            row = row.map((boardPiece, j,) => {

                if (j === 10 && i === 11) { boardPiece = '@';} // put player in center of the map
                if (j === 9 && i === 11) { this.state.direction.left = boardPiece;} // eslint-disable-line
                if (j === 11 && i === 11) { this.state.direction.right = boardPiece;} // eslint-disable-line
                if (j === 10 && i === 10) { this.state.direction.up = boardPiece;} // eslint-disable-line
                if (j === 10 && i === 12) {this.state.direction.down = boardPiece;} // eslint-disable-line
 
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
                        <h3><b>Next Move: <span id='move'>{this.state.move}</span></b></h3>
                    </div>
                    <div className="col-sm-6">
                        <img className="fish-img" src={fish} alt="Fish" /> {this.state.heldItem === 'fish' ? <label className="fish-select">*</label> : null}  <label className="fish-inv">x {this.state.fishAmount}</label>
                        <img className="lava-wand-img" src={lavaWand} alt="Lava Wand" /> {this.state.heldItem === 'wand' ? <label className="wand-select">*</label> : null} <label className="lava-wand-inv">x {this.state.lavaWandAmount}</label>
                    </div>
                </div>
            </div>
        );
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