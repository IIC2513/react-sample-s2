import "./square.css";
import PropTypes from "prop-types";
import PawnImg from "../../assets/pawn.png";
import WPawnImg from "../../assets/wpawn.png";

// Posisciones iniciales para las piezas del tablero

const initialStateDark = [
  ["a", "1"], ["b", "2"], ["c", "1"], ["d", "2"], ["e", "1"], ["f", "2"], ["g", "1"], ["h", "2"]
]; 
const initialStateLight = [
  ["a", "2"], ["b", "1"], ["c", "2"], ["d", "1"], ["e", "2"], ["f", "1"], ["g", "2"], ["h", "1"]
];

const initialStateDarkWhite = [
  ["a", "7"], ["b", "8"], ["c", "7"], ["d", "8"], ["e", "7"], ["f", "8"], ["g", "7"], ["h", "8"]
];

const initialStateLightWhite = [
  ["a", "8"], ["b", "7"], ["c", "8"], ["d", "7"], ["e", "8"], ["f", "7"], ["g", "8"], ["h", "7"]
];

export default function Square({ num, i, j }) {
  const newNum = Number(num);

  // Revisa si [i, j] existe en initialStateDark y initialStateDarkWhite
  const isDarkPawn = initialStateDark.some(([row, col]) => row === i && col === j);
  const isDarkPawnWhite = initialStateDarkWhite.some(([row, col]) => row === i && col === j);

  // Revisa si [i, j] existe en initialStateLight y initialStateLightWhite
  const isLightPawn = initialStateLight.some(([row, col]) => row === i && col === j);
  const isLightPawnWhite = initialStateLightWhite.some(([row, col]) => row === i && col === j);

  // Determinamos qué imagen utilizamos
  let pawnImage;
  if (newNum % 2 === 0) {
    if (isDarkPawn) {
      pawnImage = PawnImg;
    } else if (isDarkPawnWhite) {
      pawnImage = WPawnImg;
    }
  } else {
    if (isLightPawn) {
      pawnImage = PawnImg;
    } else if (isLightPawnWhite) {
      pawnImage = WPawnImg;
    }
  }

  return (
    <div className={`square ${newNum % 2 === 0 ? "dark" : "light"}`}>
      {pawnImage ? (
        <div style={{ backgroundImage: `url(${pawnImage})` }} className="pawn"></div>
      ) : null}
    </div>
  );
}

Square.propTypes = {
  num: PropTypes.number.isRequired,
  i: PropTypes.string.isRequired,
  j: PropTypes.string.isRequired,
};

