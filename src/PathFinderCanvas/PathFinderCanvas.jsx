import { useState, useRef, useEffect } from "react";
import Node from "./Node";
import TopNav from "../MainScreen/TopNav";
import { createGrid } from '../helper/helper';
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";

const NUMBER_OF_ROWS = 30;
const NUMBER_OF_COLS = 70;
let START_NODE_ROW = 10;
let START_NODE_COL = 10;
let DESTINATION_NODE_ROW = 15;
let DESTINATION_NODE_COL = 30;

function PathFinderCanvas() {
  const [isMouseActive,setIsMouseActive] = useState(false);
  const [reset,setReset] = useState(0);
  const [moveSource,setMoveSource] = useState(false);
  const [moveDestination,setMoveDestination] = useState(false);
  const [isAddWeightMode,setIsAddWeightMode] = useState(false);
  const [weightMode,setWeightMode] = useState(false);
  const [currWeight,setCurrWeight] = useState(0);
  const [grid,setGrid] = useState([]);

  const handleMouseDown = (row,col) => {
    if(grid[row][col].isStart) {
      setMoveSource(true);
      grid[row][col].isStart = false;
    } else if(grid[row][col].isDestination) {
      setMoveDestination(true);
      grid[row][col].isDestination = !grid[row][col].isDestination;
    } else if(isAddWeightMode){
      setWeightMode(true);
      grid[row][col].weight = currWeight;
      document.getElementById(`node-${row}-${col}`).classList.toggle('node-weight');
    } else {
      setIsMouseActive(true);
      grid[row][col].isWall = !grid[row][col].isWall;
      document.getElementById(`node-${row}-${col}`).classList.toggle('node-wall');
    }
  }
  const handleMouseOver = (row,col) => {
    const ele = document.getElementById(`node-${row}-${col}`);
    if(moveSource) {
      ele.classList.add('node-start');
    }else if(moveDestination) {
      ele.classList.add('node-destination');
    }else if(isAddWeightMode && weightMode){
      grid[row][col].weight = currWeight;
      ele.classList.toggle('node-weight');
    } else if (isMouseActive && !grid[row][col].isDestination && !grid[row][col].isStart) {
      grid[row][col].isWall = !grid[row][col].isWall;
      ele.classList.toggle('node-wall');
    }
  }

  const handleMouseOut = (row,col) => {
    const ele = document.getElementById(`node-${row}-${col}`);
    if(moveSource) {
      ele.classList.remove('node-start');
    }else if(moveDestination) {
      ele.classList.remove('node-destination');
    }
  }

  const handleMouseUp = (row,col) => {
    if(moveSource) {
      grid[row][col].isStart = true;
      START_NODE_ROW = row;
      START_NODE_COL = col;
      setMoveSource(false);
    } else if(moveDestination) {
      grid[row][col].isDestination = true;
      DESTINATION_NODE_ROW = row;
      DESTINATION_NODE_COL = col;
      setMoveDestination(false);
    }
    setIsMouseActive(false);
    setWeightMode(false);
  }

  const startDijkstra = () => {
    // handleReset();
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
            },20 * j)
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
    window.stop();
    setGrid([]);
    setReset(reset => reset+1);
  }

  useEffect(() => {
    setGrid(createGrid(NUMBER_OF_ROWS,NUMBER_OF_COLS,START_NODE_ROW,START_NODE_COL,DESTINATION_NODE_ROW,DESTINATION_NODE_COL));
  },[reset])

  return (
    <>
      <TopNav visualize={startDijkstra} 
              handleReset={handleReset} 
              setCurrWeight={setCurrWeight}
              setIsAddWeightMode={setIsAddWeightMode}
      ></TopNav>
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
                      onMouseOut={handleMouseOut}
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
