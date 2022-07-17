
import { sortNodesByDistance, getUnvisitedNeighbors } from "./multiUseFunctions";

export default function aStarAlgo(grid, startNode, rowMax, colMax, finishNode) {

    let distStore = new Array(rowMax);
    for(let i=0; i<rowMax; i++) distStore[i] = new Array(colMax);

    distStore[finishNode.row][finishNode.col] = 0;

    const visited = [];
    const unvisited = [];

    unvisited.push(finishNode);

    finishNode.isVisitedE = true;
    finishNode.distance = 0;

    while(unvisited.length) {

        sortNodesByDistance(unvisited);

        const current = unvisited.shift();
        visited.push(current);
    
        const update = updateEUnvisitedNeighbors(current, grid, distStore);
        distStore = update.distanceArray;

        update.neighbors.forEach( node => {
          node.isVisitedE = true;
          unvisited.push(node);
        });
    }

    const visitedStart = [];
    unvisited.push(startNode);

    startNode.isVisitedS = true;

    startNode.distance = 0;
    startNode.f =  startNode.distance + distStore[startNode.row][startNode.col];

    while(unvisited.length) {

        sortNodesByfFunction(unvisited);

        const current = unvisited.shift();
        visitedStart.push(current);

        if(current === finishNode) break;
    
        const update = updateSUnvisitedNeighbors(current, grid, distStore);
        distStore = update.distanceArray;

        update.neighbors.forEach( node => {
          node.isVisitedS = true;
          unvisited.push(node);
        });
    }

    return { visitedNodesE: visited, timeTaken: distStore[startNode.row][startNode.col] }
}

function sortNodesByfFunction(unvisited) {
    unvisited.sort( (nodeA, nodeB) => nodeA.f - nodeB.f );
}

function updateSUnvisitedNeighbors(node, grid, distStore) {

    const allNeighbors = getUnvisitedNeighbors(node, grid, 'S');

    for (const neighbor of allNeighbors) { 
        neighbor.distance = node.distance + 1;
        neighbor.f = neighbor.distance + distStore[neighbor.row][neighbor.col];
        neighbor.previousNode = node;
    }

    return {neighbors: allNeighbors, distanceArray: distStore};
}

function updateEUnvisitedNeighbors(node, grid, distStore) {

    const allNeighbors = getUnvisitedNeighbors(node, grid, 'E');

    for (const neighbor of allNeighbors) {  

        distStore[neighbor.row][neighbor.col] = distStore[node.row][node.col] + neighbor.weight + 1;
        neighbor.distance = distStore[neighbor.row][neighbor.col];
    }

    return {neighbors: allNeighbors, distanceArray: distStore};
}