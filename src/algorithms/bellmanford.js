
import { sortNodesByDistance, getAllNeighbors, getUnvisitedNeighbors, getShortestPathNodes } from "./multiUseFunctions";

const flagNodes = [];
const nodesToTravel = [];

export default function bellmanford(grid, startNode, rowMax, colMax, finishNode) {

    let distStore = new Array(rowMax);
    for(let i=0; i<rowMax; i++) distStore[i] = new Array(colMax);

    distStore[startNode.row][startNode.col] = 0;

    const visited = [];
    const unvisited = [];

    unvisited.push(startNode);

    startNode.isVisitedS = true;
    startNode.distance = 0;

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

    let distanceFlagNodes = new Array(flagNodes.length);
    
    shortestPathFromFlags(grid, startNode, finishNode, flagNodes, distanceFlagNodes, rowMax, colMax, shortestPathFromFlagsArray);

    for(const nodes of pathTraversalOrder) {

        for(const node of nodes) {

            nodesToTravel.push(node);
        }
    }

    nodesToTravel.push(finishNode);
    
    return { visitedNodes: visited, timeTaken: minSum, shortestPathNodes: nodesToTravel };
}

let minSum = Number.MAX_SAFE_INTEGER; // 9
let pathTraversalOrder = [];
let nodesBetweenThese = [];

function shortestPathFromFlags(grid, startNode, finishNode, flagNodes, distanceFlagNodes, rowMax, colMax, shortestPathFromFlagsArray) {

    if(shortestPathFromFlagsArray.length === flagNodes.length) {

        let sum = 0;

        for(const dist of distanceFlagNodes) sum += dist;

        sum += shortDistance(grid, startNode, finishNode, rowMax, colMax);

        if(sum < minSum) {
            minSum = sum;
            pathTraversalOrder = [...nodesBetweenThese];
        }

        nodesBetweenThese.pop();

        return;
    }

    for(let idx= 0; idx < flagNodes.length; idx++) {

        if(!flagNodes[idx].isVisitedF) {

            flagNodes[idx].isVisitedF = true;
            shortestPathFromFlagsArray.push(flagNodes[idx]);

            distanceFlagNodes[idx] = shortDistance(grid, startNode, flagNodes[idx], rowMax, colMax);

            shortestPathFromFlags(grid, flagNodes[idx], finishNode, flagNodes, distanceFlagNodes, rowMax, colMax, shortestPathFromFlagsArray);

            flagNodes[idx].isVisitedF = false;
            shortestPathFromFlagsArray.pop();
            nodesBetweenThese.pop();
        }
    }
}

function shortDistance(grid, startNode, finishNode, rowMax, colMax) {

    let nodesBetween = [];

    let checkStore = new Array(rowMax);
    for(let i=0; i < rowMax; i++) checkStore[i] = new Array(colMax);

    let distStore = new Array(rowMax);
    for(let i=0; i < rowMax; i++) distStore[i] = new Array(colMax).fill(Number.MAX_SAFE_INTEGER);

    checkStore[startNode.row][startNode.col] = true;
    distStore[startNode.row][startNode.col] = 0;
    
    startNode.distance = 0;
    const visited = [];
    const unvisited = [];

    unvisited.push(startNode);

    let distanceToReturn = 0;

    while(unvisited.length) {

        sortNodesByDistance(unvisited);

        const current = unvisited.shift();
        visited.push(current);

        if(current === finishNode) {
            distanceToReturn = current.distance;
            break;
        }
        const update = updateUnvisitedNeighborsByMatrix(current, grid, checkStore, distStore);
        checkStore = update.checkArray;
        distStore = update.distanceArray;

        update.neighbors.forEach( node => {
            checkStore[node.row][node.col] = true;
            unvisited.push(node);
        });
    }

    let currNode = finishNode;

    while(currNode != null) {

        const maybePreNode = getTheLowestNode( grid, currNode, distStore );

        currNode = maybePreNode;

        nodesBetween.unshift(currNode);

        if(currNode === startNode) break;
    }

    nodesBetweenThese.push(nodesBetween);

    return distanceToReturn;
}

function getTheLowestNode( grid, node, distStore ) {

    const neighborNodes = getAllNeighbors( node, grid );
    
    let lowDistance = Number.MAX_SAFE_INTEGER;
    let minNode = null;

    for( const neighbor of neighborNodes ) {

        if( distStore[neighbor.row][neighbor.col] < lowDistance ) {

            lowDistance = distStore[neighbor.row][neighbor.col];
            minNode = neighbor;
        }
    }

    return minNode;
}

function updateUnvisitedNeighbors(node, grid, distStore) {

    const allNeighbors = getUnvisitedNeighbors(node, grid, 'S');

    for (const neighbor of allNeighbors) {  

        distStore[neighbor.row][neighbor.col] = distStore[node.row][node.col] + neighbor.weight + 1;
        neighbor.distance = distStore[neighbor.row][neighbor.col];
    }

    return {neighbors: allNeighbors, distanceArray: distStore};
}

function updateUnvisitedNeighborsByMatrix(node, grid, checkStore, distStore) {

    const allNeighbors = getAllNeighbors(node, grid);

    const nonCheckedNeighbors = [];

    for(const neighbor of allNeighbors) {

        if(!checkStore[neighbor.row][neighbor.col]) nonCheckedNeighbors.push(neighbor);
    }

    for (const neighbor of nonCheckedNeighbors) {

        checkStore[neighbor.row][neighbor.col] = true;
        neighbor.distance = node.distance + neighbor.weight + 1;
        distStore[neighbor.row][neighbor.col] = neighbor.distance;
    }

    return { neighbors: nonCheckedNeighbors, distanceArray: distStore, checkArray: checkStore };
}
