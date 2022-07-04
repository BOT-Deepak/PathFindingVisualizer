import Queue from "./queue";
import 'jquery/dist/jquery.min.js'

export function bidirectional(grid, startNode, endNode) {
    
    let start_visited = [];
    let end_visited = [];

    let start_unvisited = new Queue();
    let end_unvisited = new Queue();

    let intersectNode = -1;

    start_unvisited.enqueue(startNode);
    end_unvisited.enqueue(endNode);

    startNode.isVisitedS = true;
    endNode.isVisitedE = true;

    while(!start_unvisited.isEmpty() && !end_unvisited.isEmpty()) {

        const bfsSResult = bfsS(grid, start_unvisited, start_visited);
        const bfsEResult = bfsE(grid, end_unvisited, end_visited);

        if(start_unvisited.peek().isVisitedS && start_unvisited.peek().isVisitedE) {
            intersectNode = start_unvisited.peek();
            start_visited.push(intersectNode);
            break;
        }
        else if(end_unvisited.peek().isVisitedS && end_unvisited.peek().isVisitedE) {
            intersectNode = end_unvisited.peek();
            end_visited.push(intersectNode);
            break;
        }

        start_unvisited = bfsSResult.unvisited;
        start_visited = bfsSResult.visited;
        end_unvisited = bfsEResult.unvisited;
        end_visited = bfsEResult.visited;
    }

    return {sVisited: start_visited, eVisited: end_visited, intersectNode: intersectNode};
}

function bfsS(grid, unvisited, visited) {

    const current = unvisited.dequeue();
    visited.push(current);

    const neighborNodes = getUnvisitedNeighborsforStart(current, grid);

    for (const neighbor of neighborNodes) {
        neighbor.previousNode = current;
    }

    neighborNodes.forEach( node => {
        node.isVisitedS = true;
        unvisited.enqueue(node);
    });
    
    return { unvisited: unvisited, visited: visited};
    
}

function bfsE(grid, unvisited, visited) {

    const current = unvisited.dequeue();
    visited.push(current);

    const neighborNodes = getUnvisitedNeighborsforEnd(current, grid);

    for (const neighbor of neighborNodes) {
        neighbor.nextNode = current;
    }

    neighborNodes.forEach( node => {
        node.isVisitedE = true;
        unvisited.enqueue(node);
    });

    return { unvisited: unvisited, visited: visited};
}

function getUnvisitedNeighborsforStart(node, grid) {
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

function getUnvisitedNeighborsforEnd(node, grid) {
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

    return neighbors.filter((neighbor) => !neighbor.isVisitedE);
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