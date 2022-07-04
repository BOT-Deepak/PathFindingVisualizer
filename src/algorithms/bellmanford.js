
export function bellmanford(grid, startNode, rowMax, colMax) {

    let distStore = new Array(rowMax);
    for(let i=0; i<rowMax; i++) distStore[i] = new Array(colMax);

    distStore[startNode.row][startNode.col] = 0;

    const visited = [];
    const unvisited = [];
    unvisited.push(startNode);
    startNode.isVisitedS = true;

    while(unvisited.length) {

        sortNodesByDistance(unvisited);

        const current = unvisited.shift();
        visited.push(current);
    
        const update = updateUnvisitedNeighbors(current, grid, distStore);
        distStore = update.distanceArray;

        update.neighbors.forEach( node => {
          node.isVisitedS = true;
          unvisited.push(node);
        });
    }
    
    return {visitedNodes: visited, distanceArray: distStore };
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid, distStore) {
    const allNeighbors = getUnvisitedNeighbors(node, grid);

    for (const neighbor of allNeighbors) {  
        distStore[neighbor.row][neighbor.col] = distStore[node.row][node.col] + neighbor.weight + 1; 
        neighbor.previousNode = node;
    }

    return {neighbors: allNeighbors, distanceArray: distStore};
  }

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;

    if (row > 0) {
        if(!grid[row - 1][col].isWall) neighbors.push(grid[row - 1][col]);
    }
    if (row < grid.length - 1) {
        if(!grid[row + 1][col].isWall) neighbors.push(grid[row + 1][col]);
    }
    if (col > 0) {
        if(!grid[row][col - 1].isWall) neighbors.push(grid[row][col - 1]);
    }
    if (col < grid[0].length - 1) {
        if(!grid[row][col + 1].isWall) neighbors.push(grid[row][col + 1]);
    }

    return neighbors.filter((neighbor) => !neighbor.isVisitedS);
}

export function getShortestPathNodesBF(lastNode) {

    const nodesInShortestPathOrder = [];
    let currentNode = lastNode;
  
    while (currentNode !== null) {
  
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
  
    return nodesInShortestPathOrder;
  }