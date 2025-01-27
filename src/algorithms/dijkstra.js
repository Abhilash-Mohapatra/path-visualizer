export const dijkstra = (grid, startNode, destinationNode) => {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while(!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const currNode =  unvisitedNodes.shift();

        if(currNode.isWall) continue;
        
        if(currNode.distance === Infinity) return visitedNodesInOrder;
        
        currNode.isVisited = true;
        visitedNodesInOrder.push(currNode);

        if(currNode === destinationNode) return visitedNodesInOrder;

        updateUnvisitedNodes(currNode,grid);
    }
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

const updateUnvisitedNodes = (node,grid) => {
    const unvisitedNeighbors = getUnvisitedNeighourNodes(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + neighbor.weight;
        neighbor.prevNode = node;
    }
}

const getUnvisitedNeighourNodes = (node,grid) => {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
}

export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.prevNode;
    }
    return nodesInShortestPathOrder;
}