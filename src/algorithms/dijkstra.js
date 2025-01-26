import { MinHeap } from "@datastructures-js/heap";

export const dijkstra = (grid, startNode, destinationNode) => {
    const visitedNodesInOrder = [];
    const unvisitedNodes = new MinHeap((node) => node.distance);
    startNode.distance = 0;
    unvisitedNodes.insert(startNode);
    while(!unvisitedNodes.isEmpty()) {
        const currNode = unvisitedNodes.extractRoot();
        if(currNode.isWall) continue;
        
        if(currNode.distance === Infinity) return visitedNodesInOrder;
        
        currNode.isVisited = true;
        visitedNodesInOrder.push(currNode);

        document.getElementById(`node-${currNode.row}-${currNode.col}`).classList.add('node-visited')
        if(currNode === destinationNode) {
            console.log("Found the path :) ");
            return visitedNodesInOrder;
        }

        updateUnvisitedNodes(currNode,grid,unvisitedNodes);
    }
}

const updateUnvisitedNodes = (node,grid,unvisitedNodes) => {
    const unvisitedNeighbors = getUnvisitedNeighourNodes(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.prevNode = node;
        unvisitedNodes.insert(neighbor);
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

export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.prevNode;
    }
    return nodesInShortestPathOrder;
}