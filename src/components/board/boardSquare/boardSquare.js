import React from 'react';

import './boardSquare.css';

class BoardSquare extends React.Component {

    render() {
        return (
            <div className="boardPiece">
                <div id="boardPiece">
                    {this.props.boardPiece}
                </div>
            </div>
        );
    }

}

export default BoardSquare;