import "./square.css"
import PropTypes from "prop-types";
import PawnImg from "../../assets/pawn.png";

// Recibe un num y luego decide si es que el cuadrado es oscuro o claro
export default function Square({ num }) {
    let newNum = Number(num);
    // console.log(newNum);
    if (newNum % 2 === 0) {
        return <div className="square dark">
                    <div style={{backgroundImage: `url(${PawnImg})`}} className="pawn"></div>
                </div>
    } else {
        return <div className="square light"></div>
    }
}

Square.propTypes = {
    num: PropTypes.number.isRequired, 
};