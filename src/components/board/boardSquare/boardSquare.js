import React from 'react';

import './boardSquare.css';

const GROUND = ".";
const PLAYER = "@";

const GROUND_CSS = "piece-ground";
const PLAYER_CSS = "piece-player";
const DEFAULT_CSS = "piece-player";

class BoardSquare extends React.Component {

    getPieceDisplay = (boardPiece) => {

        let pieceClass = ""

        switch(boardPiece){
            case GROUND : 
                pieceClass = GROUND_CSS;
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