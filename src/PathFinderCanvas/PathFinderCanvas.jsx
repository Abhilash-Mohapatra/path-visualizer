import { useState, useEffect, useRef } from "react";
import Node from "./Node";

const NUMBER_OF_ROWS = 20;
const NUMBER_OF_COLS = 30;

function PathFinderCanvas() {
  const [isMouseActive,setIsMouseActive] = useState(false);
  const nodeRefs = useRef([]);

  const nodes = [];
  for(let i = 0 ; i < NUMBER_OF_ROWS ; i++) {
    const currRow = [];
    for(let j = 0 ; j < NUMBER_OF_COLS ; j++) {
      let curNode = {
        row: i,
        col: j
      }

      currRow.push(curNode);
    }
    nodes.push(currRow);
  }

  const handleMouseDown = (row,col) => {
    setIsMouseActive(true);
    document.getElementById(`node-${row}-${col}`).classList.toggle('node-wall');
  }
  const handleMouseOver = (row,col) => {
    isMouseActive && document.getElementById(`node-${row}-${col}`).classList.toggle('node-wall');
  }
  const handleMouseUp = () => {
    setIsMouseActive(false);
  }
  return (
    <>
      <div className="canvas-grid">
        {nodes.map((row,rowIdx) => {
          return (
            <div className="grid-row" key={rowIdx}>
              {row.map((node,nodeIdx) => {
                  return (
                    <Node key={nodeIdx} row={node.row} col={node.col} 
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
