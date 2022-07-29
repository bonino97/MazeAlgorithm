import React from "react";
import PropTypes from "prop-types";

import "src/components/Node/Node.css";

const Node = ({ isStart, isEnd, isWall, row, col }) => {
  const classes = isStart
    ? "node-start"
    : isWall
    ? "is-wall"
    : isEnd
    ? "node-end"
    : "";

  return <span className={`node ${classes}`} id={`node-${row}-${col}`}></span>;
};

Node.propTypes = {
  isStart: PropTypes.bool.isRequired,
  isEnd: PropTypes.bool.isRequired,
  isWall: PropTypes.bool.isRequired,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
};

export default Node;