
export default function bellmanford(grid, startNode, rowMax, colMax, finishNode) {

    let distStore = new Array(rowMax);
    for(let i=0; i<rowMax; i++) distStore[i] = new Array(colMax);

    distStore[startNode.row][startNode.col] = 0;

    const visited = [];
    const unvisited = [];
    unvisited.push(startNode);
    startNode.isVisitedS = true;
    startNode.distance = 0;

    const flagNodes = [];

    while(unvisited.length) {

        sortNodesByDistance(unvisited);

        const current = unvisited.shift();
        visited.push(current);

        if(current.isFlag) flagNodes.push(current);
    
        const update = updateUnvisitedNeighbors(current, grid, distStore);
        distStore = update.distanceArray;

        update.neighbors.forEach( node => {
          node.isVisitedS = true;
          unvisited.push(node);
        });
    }

    if(flagNodes.length === 0) {

        let currNode = finishNode;

        while(currNode != null) {
            const maybeNeighbors = getAllNeighbors(currNode, grid);
            sortNodesByDistance(maybeNeighbors);

            const maybePreNode = maybeNeighbors[0];

            currNode.previousNode = maybePreNode;
            currNode = currNode.previousNode;

            if(currNode.isStart) break;
        }

        const shortestPathNodes = getShortestPathNodes(finishNode);
        
        return { visitedNodes: visited, timeTaken: distStore[finishNode.row][finishNode.col], shortestPathNodes: shortestPathNodes };
    }

    let shortestPathFromFlagsArray = [];
    
    shortestPathFromFlags(grid, startNode, finishNode, flagNodes, rowMax, colMax, shortestPathFromFlagsArray);
    pathTraversalOrder.unshift(startNode);

    linkThePath(grid, rowMax, colMax);
    
    return { visitedNodes: visited, timeTaken: minSum, shortestPathNodes: nodesToTravel };
}

let minSum = Number.MAX_SAFE_INTEGER;
let pathTraversalOrder = [];

function shortestPathFromFlags(grid, startNode, finishNode, flagNodes, rowMax, colMax, shortestPathFromFlagsArray) {

    if(shortestPathFromFlagsArray.length === flagNodes.length) {

        let sum = 0;

        for(const flag of shortestPathFromFlagsArray) sum += flag.distance;

        sum += shortDistance(grid, startNode, finishNode, rowMax, colMax);

        if(sum < minSum) {
            minSum = sum;
            pathTraversalOrder = [...shortestPathFromFlagsArray];
            pathTraversalOrder.push(finishNode);
        }

        return;
    }

    for(let idx= 0; idx < flagNodes.length; idx++) {

        if(!flagNodes[idx].isVisitedF) {

            flagNodes[idx].isVisitedF = true;
            const distance0 = flagNodes[idx];

            flagNodes[idx].distance = shortDistance(grid, startNode, flagNodes[idx], rowMax, colMax);

            shortestPathFromFlagsArray.push(flagNodes[idx]);

            shortestPathFromFlags(grid, flagNodes[idx], finishNode, flagNodes, rowMax, colMax, shortestPathFromFlagsArray);
            
            flagNodes[idx].distance = distance0;
            flagNodes[idx].isVisitedF = false;
            shortestPathFromFlagsArray.splice(-1);
        }
    }
}

function shortDistance(grid, startNode, finishNode, rowMax, colMax) {

    let checkStore = new Array(rowMax);
    for(let i=0; i<rowMax; i++) checkStore[i] = new Array(colMax);

    checkStore[startNode.row][startNode.col] = true;
    
    startNode.distance = 0;
    const visited = [];
    const unvisited = [];

    unvisited.push(startNode);
    startNode.distance = 0;


    while(unvisited.length) {

        sortNodesByDistance(unvisited);

        const current = unvisited.shift();
        visited.push(current);

        if(current === finishNode) return current.distance;
    
        const update = updateUnvisitedNeighborsByMatrix(current, grid, checkStore);
        checkStore = update.distanceArray;

        update.neighbors.forEach( node => {
            checkStore[node.row][node.col] = true;
            unvisited.push(node);
        });
    }

    return null;
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid, distStore) {
    const allNeighbors = getUnvisitedNeighbors(node, grid);

    for (const neighbor of allNeighbors) {  
        distStore[neighbor.row][neighbor.col] = distStore[node.row][node.col] + neighbor.weight + 1;
        neighbor.distance = distStore[neighbor.row][neighbor.col];
    }

    return {neighbors: allNeighbors, distanceArray: distStore};
}

function updateUnvisitedNeighborsByMatrix(node, grid, checkStore) {
    const allNeighbors = getAllNeighbors(node, grid);

    const nonCheckedNeighbors = [];

    for(const neighbor of allNeighbors) {
        if(!checkStore[neighbor.row][neighbor.col]) nonCheckedNeighbors.push(neighbor);
    }

    for (const neighbor of nonCheckedNeighbors) { 
        neighbor.distance = node.distance + neighbor.weight + 1;
        checkStore[neighbor.row][neighbor.col] = true;
    }

    return {neighbors: nonCheckedNeighbors, distanceArray: checkStore};
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

function getAllNeighbors(node, grid) {
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

function linkThePath(grid, rowMax, colMax) {
    
    for(let i = 0; i < pathTraversalOrder.length -1; i++) {

        makeLinks(grid, pathTraversalOrder[i], pathTraversalOrder[i+1], rowMax, colMax);
    }

    nodesToTravel.push(pathTraversalOrder[pathTraversalOrder.length -1]);
}

const nodesToTravel = [];

function makeLinks(grid, startNode, finishNode, rowMax, colMax) {

    let nodesBetweenThese = [];

    let checkStore = new Array(rowMax);
    for(let i=0; i<rowMax; i++) checkStore[i] = new Array(colMax);

    checkStore[startNode.row][startNode.col] = true;
    
    startNode.distance = 0;
    const visited = [];
    const unvisited = [];

    unvisited.push(startNode);
    startNode.distance = 0;

    while(unvisited.length) {

        sortNodesByDistance(unvisited);

        const current = unvisited.shift();
        visited.push(current);
    
        const update = updateUnvisitedNeighborsByMatrix(current, grid, checkStore);
        checkStore = update.distanceArray;

        update.neighbors.forEach( node => {
            checkStore[node.row][node.col] = true;
            unvisited.push(node);
        });
    }

    let currNode = finishNode;

    while(currNode != null) {

        const maybeNeighbors = getAllNeighbors(currNode, grid);
        sortNodesByDistance(maybeNeighbors);

        const maybePreNode = maybeNeighbors[0];

        currNode = maybePreNode;

        nodesBetweenThese.unshift(currNode);

        if(currNode === startNode) break;
    }

    for(const node of nodesBetweenThese) nodesToTravel.push(node);
}

function getShortestPathNodes(lastNode) {

    const nodesInShortestPathOrder = [];
    let currentNode = lastNode;
    
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
  
    return nodesInShortestPathOrder;
}