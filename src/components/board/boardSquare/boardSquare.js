import React from 'react';

import './boardSquare.css';

class BoardSquare extends React.Component {

    getPieceDisplay = (boardPiece) => {

        let pieceClass = ""

        switch(boardPiece){
            case "." : 
                pieceClass = "piece-ground";
                break;

            case "@" : 
                pieceClass = "piece-player";
                break;

            default :
                pieceClass = "piece-ground";
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