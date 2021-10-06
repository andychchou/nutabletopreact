import React from 'react';
import './chess.css';
import Square from './Square.js';

export default class FallenSoldierBlock extends React.Component {

    renderSquare(square, i, squareShade) {
        return <Square
            key={i}
            keyVal={i}
            piece={square}
            style={square.style}
        />
    }

    render() {
        return (
            <div>
                <h6>Black's captured pieces:</h6>
                <div className="board-row">
                    {this.props.whiteFallenSoldiers.map((ws, index) => this.renderSquare(ws, index))}
                </div>
                <h6>White's captured pieces:</h6>
                <div className="board-row">
                    {this.props.blackFallenSoldiers.map((bs, index) => this.renderSquare(bs, index))}
                </div>
            </div>
        );
    }
}