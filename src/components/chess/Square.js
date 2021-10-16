import React from 'react';
import './chess.css';

export default function Square(props) {
    return (
        <button className={"chess-square " + props.shade}
            onClick={props.onClick}
            style={props.style}
            key={props.keyVal}
        >
        </button>
    );

}