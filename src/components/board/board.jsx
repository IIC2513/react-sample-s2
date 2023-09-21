import { useRef } from 'react';
import Square from "../square/square";
import "./board.css"

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

export default function Board() {
    const boardRef = useRef(null);
    // Variable que gestiona si es que hay un elemento seleccionado
    let activePiece = null;

    function grabPiece(e) {
        const element = e.target;
        if (element.classList.contains("pawn")) {
            // Estas fórmulas calculan la nueva posición del peón según la posición del cursor, relativo al tablero.
            const x = e.clientX - element.parentElement.offsetLeft - element.parentElement.parentElement.offsetLeft - (element.offsetWidth/2);
            const y = e.clientY - element.parentElement.offsetTop  - element.parentElement.parentElement.offsetTop - (element.offsetHeight/2);
            element.style.position = "relative";
            // Ajustar posición del peón.
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            activePiece = element;
        }
    }

    function movePiece(e) {
        if (activePiece) {
            // Estas fórmulas calculan la nueva posición del peón según la posición del cursor, relativo al tablero.
            const x = e.clientX - activePiece.parentElement.offsetLeft - activePiece.parentElement.parentElement.offsetLeft - (activePiece.offsetWidth/2);
            const y = e.clientY - activePiece.parentElement.offsetTop  - activePiece.parentElement.parentElement.offsetTop - (activePiece.offsetHeight/2);
            activePiece.style.position = "relative";
            // Ajustar posición del peón.
            activePiece.style.left = `${x}px`;
            activePiece.style.top = `${y}px`;
        }
    }

    function dropPiece() {
        if (activePiece) {
            activePiece = null;
        }
    }

    let board = [];
    // Inicializa el tablero
    for (let j = verticalAxis.length - 1; j >= 0; j--) {
        for (let i = 0; i < horizontalAxis.length; i++) {
            const number = i + j + 2;
            // console.log(i, j)
            board.push(<Square key={`${i},${j}`} num={number} i={horizontalAxis[i]} j={verticalAxis[j]}/>)
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