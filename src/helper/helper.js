const createNode = (row,col) => {
    return {
        row: row,
        col: col,
        isStart: false,
        isDestination: false,
        isVisited: false,
        distance: Infinity,
        isWall: false,  
        prevNode: null
    }
}

export const createGrid = (NUMBER_OF_ROWS,NUMBER_OF_COLS,startRow,startCol,destinationRow,destinationCol) => {
    const grid = [];
    for(let i = 0 ; i < NUMBER_OF_ROWS ; i++) {
        const currRow = [];
        for(let j = 0 ; j < NUMBER_OF_COLS ; j++) {
            const node = createNode(i,j);
            if(i == startRow && j == startCol) node.isStart = true;
            if(i == destinationRow && j == destinationCol) node.isDestination = true;
            currRow.push(node);
        }
        grid.push(currRow);
    }
    return grid;
}
