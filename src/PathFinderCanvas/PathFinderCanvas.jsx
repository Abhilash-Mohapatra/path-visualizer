import { useState, useEffect } from "react";
import Node from "./Node";

const NUMBER_OF_ROWS = 20;
const NUMBER_OF_COLS = 30;

function PathFinderCanvas() {
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

  return (
    <>
      <div className="canvas-grid">
        {
          nodes.map((row,rowIdx) => {
            return (
              <div className="grid-row" key={rowIdx}>
                {
                  row.map((node,nodeIdx) => {
                    return (
                      <Node key={nodeIdx} row={node.row} col={node.col}></Node>
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
