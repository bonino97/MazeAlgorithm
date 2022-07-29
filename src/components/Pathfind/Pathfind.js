/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";

import Grid from "src/components/Grid/Grid";
import Actions from "src/components/Actions/Actions";

import AStarAlgorithm from "src/providers/algorithms/AStarAlgorithm";
import {
  ROWS,
  COLS,
  NODE_START_ROW,
  NODE_START_COL,
  NODE_END_ROW,
  NODE_END_COL,
} from "src/utils/constants";

import { buildWallNodes } from "src/providers/functions/buildWallNodes";

import { createPost } from "src/providers/services/createPost";

import "src/components/Pathfind/Pathfind.css";

class Spot {
  constructor(i, j) {
    this.x = i;

    this.y = j;

    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
    this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;
    this.isWall = false;

    if (buildWallNodes(i, j)) {
      this.isWall = true;
    }

    this.neighbors = [];

    this.previous = null;
    this.addNeighbors = (grid) => {
      // Remember this.x = i and this.y = j

      if (this.x > 0) this.neighbors.push(grid[this.x - 1][this.y]);
      if (this.x < ROWS - 1) this.neighbors.push(grid[this.x + 1][this.y]);

      if (this.y > 0) this.neighbors.push(grid[this.x][this.y - 1]);
      if (this.y < COLS - 1) this.neighbors.push(grid[this.x][this.y + 1]);
    };
  }
}

const Pathfind = () => {
  const [grid, setGrid] = useState([]);
  const [path, setPath] = useState([]);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    initializeGrid();
  }, []);

  const initializeGrid = () => {
    const initialGrid = new Array(ROWS);

    for (let i = 0; i < ROWS; i++) {
      initialGrid[i] = new Array(COLS);
    }

    createSpot(initialGrid);
    setGrid(initialGrid);
    addNeighbors(initialGrid);

    const startNode = initialGrid[NODE_START_ROW][NODE_START_COL];
    const endNode = initialGrid[NODE_END_ROW][NODE_END_COL];

    const { path, visitedNodes } = AStarAlgorithm(startNode, endNode);

    startNode.isWall = false;
    endNode.isWall = false;

    setPath(path);
    setVisitedNodes(visitedNodes);
  };

  const createSpot = (grid) => {
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        grid[i][j] = new Spot(i, j);
      }
    }
  };

  const addNeighbors = (grid) => {
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        grid[i][j].addNeighbors(grid);
      }
    }
  };

  const visualizeShortestPath = (shortestPathNodes) => {
    for (let i = 0; i < shortestPathNodes.length; i++) {
      setTimeout(() => {
        const node = shortestPathNodes[i];
        document.getElementById(`node-${node.x}-${node.y}`).className =
          "node node-shortest-path";
        setMoves(i + 1);
      }, 100 * i);
    }
    
    createPost(moves);
  };

  const visualizePath = () => {
    setMoves(0);
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          visualizeShortestPath(path);
        }, 10 * i);
      } else {
        setTimeout(() => {
          const node = visitedNodes[i];

          document.getElementById(`node-${node.x}-${node.y}`).className =
            "node node-visited";
        }, 10 * i);
      }
    }
  };

  return (
    <div className="wrapper">
      <Actions moves={moves} onClick={visualizePath} />
      <Grid grid={grid} />
    </div>
  );
};

export default Pathfind;
