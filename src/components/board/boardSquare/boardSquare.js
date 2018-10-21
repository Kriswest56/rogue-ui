import React from 'react';

import './boardSquare.css';

const GROUND = ".";
const PLAYER = "@";
const WALL = '#';
const WATER = '~'

const GROUND_CSS = "piece-ground";
const PLAYER_CSS = "piece-player";
const WALL_CSS = "piece-wall";
const WATER_CSS = "piece-water";
const DEFAULT_CSS = "piece-ground";

class BoardSquare extends React.Component {

    constructor(props) {
        super(props);

        this.getPieceDisplay = this.getPieceDisplay.bind(this);
    }

    getPieceDisplay(boardPiece) {

        let pieceClass = ""

        switch (boardPiece) {
            case GROUND :
                pieceClass = GROUND_CSS;
                break;

            case WALL :
                pieceClass = WALL_CSS;
                break;

            case WATER :
                pieceClass = WATER_CSS;
                break;

            case PLAYER :
                pieceClass = PLAYER_CSS;
                break;

            default :
                pieceClass = DEFAULT_CSS;
                break
        }

        return pieceClass;
    }

    render() {
        return (
            <div className="boardPiece">
                <div className={this.getPieceDisplay(this.props.boardPiece)} id="boardPiece" />
            </div>
        );
    }

}

export default BoardSquare;