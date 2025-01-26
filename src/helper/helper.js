const createNode = (row,col) => {
    return {
        row: row,
        col: col,
        isStart: row == 10 && col == 10,
        isDestination: row == 15 && col == 30,
        isVisited: false,
        distance: Infinity,
        isWall: false,  
        prevNode: null
    }
}

export const createGrid = (NUMBER_OF_ROWS,NUMBER_OF_COLS) => {
    const grid = [];
    for(let i = 0 ; i < NUMBER_OF_ROWS ; i++) {
        const currRow = [];
        for(let j = 0 ; j < NUMBER_OF_COLS ; j++) {
            currRow.push(createNode(i,j));
        }
        grid.push(currRow);
    }
    return grid;
}
