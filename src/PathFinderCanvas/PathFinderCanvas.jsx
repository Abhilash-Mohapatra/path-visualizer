import { useState, useRef, useEffect } from "react";
import Node from "./Node";
import TopNav from "../MainScreen/TopNav";
import { createGrid } from '../helper/helper';
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";

const NUMBER_OF_ROWS = 20;
const NUMBER_OF_COLS = 40;
const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const DESTINATION_NODE_ROW = 15;
const DESTINATION_NODE_COL = 30;

function PathFinderCanvas() {
  const [isMouseActive,setIsMouseActive] = useState(false);
  const [startNode,setStartNode] = useState({});
  const [destinationNode,setDestinationNode] = useState({});
  const [grid,setGrid] = useState([]);

  const handleMouseDown = (row,col) => {
    setIsMouseActive(true);
    if(!grid[row][col].isDestination && !grid[row][col].isStart){
      setGrid(getNewGridWithWallToggled(grid,row,col));
    }
  }
  const handleMouseOver = (row,col) => {
    if(isMouseActive && !grid[row][col].isDestination && !grid[row][col].isStart) {
      setGrid(getNewGridWithWallToggled(grid,row,col));
    }
  }
  const handleMouseUp = () => {
    setIsMouseActive(false);
  }

  const startDijkstra = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const destinationNode = grid[DESTINATION_NODE_ROW][DESTINATION_NODE_COL];
    const visitedNodes = dijkstra(grid, startNode, destinationNode);

    const shortestPath = getNodesInShortestPathOrder(destinationNode);
    for(const node of shortestPath) {
      document.getElementById(`node-${node.row}-${node.col}`).classList.add('node-path');
    }
  }

  useEffect(() => {
    setGrid(createGrid(NUMBER_OF_ROWS,NUMBER_OF_COLS));
  },[])


  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  return (
    <>
      <TopNav visualize={startDijkstra}></TopNav>
      <div className="canvas-grid">
        {grid.map((row,rowIdx) => {
          return (
            <div className="grid-row" key={rowIdx}>
              {row.map((node,nodeIdx) => {
                  return (
                    <Node key={nodeIdx} row={node.row} col={node.col}
                      isWall = {node.isWall}
                      isStart = {node.isStart}
                      isDestination = {node.isDestination}
                      onMouseDown={handleMouseDown} 
                      onMouseUp={handleMouseUp} 
                      onMouseOver={handleMouseOver}
                    >
                    </Node>
                  )
                })
              }
            </div>
          );
         })
        }
      </div>
    </>
  )
}

export default PathFinderCanvas;
