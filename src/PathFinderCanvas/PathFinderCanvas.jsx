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
  const [reset,setReset] = useState(0);
  const [moveSource,setMoveSource] = useState(false);
  const [moveDestination,setMoveDestination] = useState(false);
  const [grid,setGrid] = useState([]);

  const handleMouseDown = (row,col) => {
    if(grid[row][col].isStart) {
      setMoveSource(true);
      grid[row][col].isStart = false;
    } else if(grid[row][col].isDestination) {
      setMoveDestination(true);
      grid[row][col].isDestination = !grid[row][col].isDestination;
    } else {
      setIsMouseActive(true);
      grid[row][col].isWall = !grid[row][col].isWall;
      document.getElementById(`node-${row}-${col}`).classList.toggle('node-wall');
    }
  }
  const handleMouseOver = (row,col) => {
    if(isMouseActive && !grid[row][col].isDestination && !grid[row][col].isStart) {
      grid[row][col].isWall = !grid[row][col].isWall;
      document.getElementById(`node-${row}-${col}`).classList.toggle('node-wall');
    }
  }
  const handleMouseUp = (row,col) => {
    if(moveSource) {
      console.log(row,col);
      grid[row][col].isStart = true;
      setMoveSource(false);
    } else if(moveDestination) {
      grid[row][col].isDestination = true;
      setMoveDestination(false);
    }
    setIsMouseActive(false);
  }

  const startDijkstra = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const destinationNode = grid[DESTINATION_NODE_ROW][DESTINATION_NODE_COL];

    const visitedNodes = dijkstra(grid, startNode, destinationNode);
    const shortestPath = getNodesInShortestPathOrder(destinationNode);

    animateVisitedNodes(visitedNodes,shortestPath);
  }

  const animateVisitedNodes = (visitedNodes,shortestPath) => {
    for(let i = 1 ; i <= visitedNodes.length ; i++) {
      if(i === visitedNodes.length) {
        setTimeout(()=> {
          for(let j = 0 ; j < shortestPath.length; j++) {
            setTimeout(()=> {
              const node = shortestPath[j];
              document.getElementById(`node-${node.row}-${node.col}`).classList.add('node-path');
            },10 * j)
          }
        },10*i)
        return;
      }
      setTimeout(()=>{
        const node = visitedNodes[i-1];
        document.getElementById(`node-${node.row}-${node.col}`).classList.add('node-visited');
        document.getElementById(`node-${node.row}-${node.col}`).classList.add('node-current');
        setTimeout(()=> {
          document.getElementById(`node-${node.row}-${node.col}`).classList.remove('node-current');
        },100);

      },10 * i)
    }
  }

  const handleReset = () => {
    setReset(reset => reset+1);
  }

  useEffect(() => {
    setGrid(createGrid(NUMBER_OF_ROWS,NUMBER_OF_COLS));
  },[reset])


  return (
    <>
      <TopNav visualize={startDijkstra} handleReset={handleReset}></TopNav>
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
                      isVisited = {node.isVisited}
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
