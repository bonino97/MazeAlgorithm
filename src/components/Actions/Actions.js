import React from "react";
import PropTypes from "prop-types";

import "src/components/Actions/Actions.css";

const Button = ({ onClick }) => {
  return (
    <button className="play-button" onClick={onClick}>
      Play
    </button>
  );
};

const MovesText = ({ moves }) => (
  <span className="moves-text">Moves: {moves}</span>
);

const Actions = ({ moves, onClick }) => {
  return (
    <div className="actions-wrapper">
      <Button onClick={onClick} />
      <MovesText moves={moves} />
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

MovesText.propTypes = {
  moves: PropTypes.number.isRequired,
};

Actions.propTypes = {
  moves: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Actions;
