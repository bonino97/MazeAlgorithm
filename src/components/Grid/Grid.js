import React from "react";
import PropTypes from "prop-types";

import Node from "src/components/Node/Node";
import "src/components/Grid/Grid.css";

const Grid = ({ grid }) => {
  return grid.map((row, rowIndex) => (
    <div key={rowIndex} className="row-wrapper">
      {row.map((col, colIndex) => {
        const { isStart, isEnd, isWall } = col;
        return (
          <Node
            key={rowIndex + colIndex}
            isStart={isStart}
            isEnd={isEnd}
            isWall={isWall}
            row={rowIndex}
            col={colIndex}
          />
        );
      })}
    </div>
  ));
};

Grid.propTypes = {
  grid: PropTypes.array.isRequired,
};

export default Grid;
