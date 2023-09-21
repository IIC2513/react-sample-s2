import { useRef } from 'react';
import Square from "../square/square";
import "./board.css"

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

// const pieces = [];
// const initialBoardState = [];

export default function Board() {
    const boardRef = useRef(null);
    // Variable que gestiona si es que hay un elemento seleccionado
    let activePiece = null;

    function grabPiece(e) {
        const element = e.target;
        console.log('e', e);
        console.log('element', element);
        // console.log('board', board);
        // console.log(`Alto del tablero: ${board.clientHeight}; Ancho del tablero: ${board.clientWidth}`);
        // console.log(`Posición relativa en el tablero: (${(e.clientX - board.offsetLeft) / board.clientWidth * 100}%, ${(e.clientY - board.offsetTop) / board.clientWidth * 100}%)`)
        // console.log('Mouse:', e.clientX - boardRef.current.offsetLeft, e.clientY - boardRef.current.offsetTop, 'Pawn:', element.offsetLeft, element.offsetTop);
        if (element.classList.contains("pawn")) {
            // const x = e.clientX - element.offsetLeft - (element.offsetWidth/2);
            // const y = e.clientY - element.offsetTop - (element.offsetHeight/2);
            const x = e.clientX - element.parentElement.offsetLeft - element.parentElement.parentElement.offsetLeft - (element.offsetWidth/2);
            const y = e.clientY - element.parentElement.offsetTop  - element.parentElement.parentElement.offsetTop - (element.offsetHeight/2);
            console.log(e.clientY, element.offsetHeight, y);
            element.style.position = "relative";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            activePiece = element;
        }
    }

    function movePiece(e) {
        const boardNotNull = boardRef.current; 
        if (activePiece && boardNotNull) {
            // console.log(boardNotNull)
            // console.log('e', e);
            // console.log('element', element);
            // console.log('board', board);
            const minX = boardNotNull.offsetLeft - 25;
            const minY = boardNotNull.offsetTop - 25;
            const maxX = boardNotNull.offsetLeft + boardNotNull.offsetWidth - 75;
            const maxY = boardNotNull.offsetTop + boardNotNull.offsetHeight - 75;
            const x = e.clientX - activePiece.parentElement.offsetLeft - activePiece.parentElement.parentElement.offsetLeft - (activePiece.offsetWidth/2);
            const y = e.clientY - activePiece.parentElement.offsetTop  - activePiece.parentElement.parentElement.offsetTop - (activePiece.offsetHeight/2);
            activePiece.style.position = "relative";
            activePiece.style.left = `${x}px`;
            activePiece.style.top = `${y}px`;
            console.log('Mouse:', e.clientX, e.clientY, 'Pawn:', activePiece.offsetLeft, activePiece.offsetTop, 'x', x, 'y', y);
            

            // Límites superiores e inferiores eje X
            // if (x < minX) {
            //     activePiece.style.left = `${minX}px`;
            // } else if (x > maxX) {
            //     activePiece.style.left = `${maxX}px`;
            // } else {
            //     activePiece.style.left = `${x}px`;
            // }
            // // Límites superiores e inferiores eje Y
            // if (y < minY) {
            //     activePiece.style.top = `${minY}px`;
            // } else if (y > maxY) {
            //     activePiece.style.top = `${maxY}px`;
            // } else {
            //     activePiece.style.top = `${y}px`;
            // }
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