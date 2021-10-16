import React, { Component } from 'react';

function Square(props) {
    return (
        <button 
            className="ttt-square"
            onClick={props.onClick}
            style={{color: props.color}}
        >
            {props.value}
        </button>
    )
}

export default Square;