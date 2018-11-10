import React from 'react';

import './boardSquare.css';

const debug = false;

const GROUND = ".";
const PLAYER = "@";
const WALL = '#';
const WATER = '~';
const TREE = 'T';
const FOG = '%';

const GROUND_CSS = "piece-ground";
const PLAYER_CSS = "piece-player";
const WALL_CSS = "piece-wall";
const WATER_CSS = "piece-water";
const TREE_CSS = "piece-tree";
const FOG_CSS = "piece-fog";
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

            case TREE :
                pieceClass = TREE_CSS;
                break;

            case FOG :
                pieceClass = FOG_CSS;
                break;

            default :
                if(!debug){
                    pieceClass = DEFAULT_CSS;
                }
                break
        }

        return pieceClass;
    }

    render() {

        const piece = debug ? this.props.boardPiece : null; 

        return (
            <div className="boardPiece">
                <div className={this.getPieceDisplay(this.props.boardPiece)} id="boardPiece">{piece}</div>
            </div>
        );
    }

}

export default BoardSquare;