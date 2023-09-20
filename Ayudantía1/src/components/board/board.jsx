import { useRef } from 'react';
import Square from "../square/square";
import "./board.css"

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

// const pieces = [];
// const initialBoardState = [];

export default function Board() {
    const boardRef = useRef(null);

    let activePiece = null;

function grabPiece(e) {
    const element = e.target;
    if (element.classList.contains("pawn")) {
        console.log(e);
        const x = e.clientX - 50;
        const y = e.clientY - 50;
        element.style.position = "absolute";
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;

        activePiece = element;
    }
}

function movePiece(e) {
    const boardNotNull = boardRef.current; 
    if (activePiece && boardNotNull) {
        const minX = boardNotNull.offsetLeft - 25;
        const minY = boardNotNull.offsetTop - 25;
        const maxX = boardNotNull.offsetLeft + boardNotNull.offsetWidth - 75;
        const maxY = boardNotNull.offsetTop + boardNotNull.offsetHeight - 75;
        const x = e.clientX - 50;
        const y = e.clientY - 50;
        activePiece.style.position = "absolute";

        if (x < minX) {
            activePiece.style.left = `${minX}px`;
        } else if (x > maxX) {
            activePiece.style.left = `${maxX}px`;
        } else {
            activePiece.style.left = `${x}px`;
        }

        if (y < minY) {
            activePiece.style.top = `${minY}px`;
        } else if (y > maxY) {
            activePiece.style.top = `${maxY}px`;
        } else {
            activePiece.style.top = `${y}px`;
        }
    }
}

function dropPiece() {
    if (activePiece) {
        activePiece = null;
    }
}

    let board = [];

    for (let j = verticalAxis.length - 1; j >= 0; j--) {
        for (let i = 0; i < horizontalAxis.length; i++) {
            const number = i + j + 2;
            
            // Pieces.forEach(p => {

            // })

            board.push(<Square key={`${i},${j}`} num={number} />)
        }
    }

    return <div 
            onMouseMove={e => movePiece(e)} 
            onMouseDown={e => grabPiece(e)} 
            onMouseUp={() => dropPiece()}
            id="board"
            ref={boardRef}
            >
                {board}
            </div>;
}