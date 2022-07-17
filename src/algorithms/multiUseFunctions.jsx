
export function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

export function runBfs(grid, unvisited, visited, char) {

    const current = unvisited.dequeue();
    visited.push(current);

    let neighborNodes = [];

    if(char === 'S') neighborNodes = getUnvisitedNeighbors(current, grid, 'S');
    else neighborNodes = getUnvisitedNeighbors(current, grid, 'E');

    for (const neighbor of neighborNodes) {
        if(char === 'S') neighbor.previousNode = current;
        else neighbor.nextNode = current;
    }

    neighborNodes.forEach( node => {
        
        if(char === 'S') node.isVisitedS = true;
        else node.isVisitedE = true;

        unvisited.enqueue(node);
    });
    
    return { unvisited: unvisited, visited: visited};
}

export function getUnvisitedNeighbors(node, grid, char) {

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

    if(char === 'S') return neighbors.filter((neighbor) => !neighbor.isVisitedS);
    
    return neighbors.filter((neighbor) => !neighbor.isVisitedE);
}

export function getAllNodes(grid) {
    
    const nodes = [];

    for (const row of grid) {

        for (const node of row) {
            nodes.push(node);
        }
    }

    return nodes;
}

export function getAllNeighbors(node, grid) {
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

    return neighbors;
}

export function getShortestPathNodes(finishNode) {

    const nodesInShortestPathOrder = [];

    let currentNode = finishNode;

    while (currentNode !== null) {

      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }

    return nodesInShortestPathOrder;
}

export function getShortestPathNodesBD(intersectNode) {

    const nodesInShortestPathOrder = [];
    let currentNode = intersectNode;
  
    while (currentNode !== null) {
  
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    currentNode = intersectNode.nextNode;

    while(currentNode !== null) {
        nodesInShortestPathOrder.push(currentNode);
        currentNode = currentNode.nextNode;
    }
  
    return nodesInShortestPathOrder;
}