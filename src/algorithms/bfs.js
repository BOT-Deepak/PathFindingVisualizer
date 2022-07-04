
import Queue from "./queue";

export function bfs(grid, startNode, endNode) {

  const unvisited = new Queue();
  const visited = [];

  unvisited.enqueue(startNode);
  startNode.isVisitedS = true;

  while(unvisited.length()) {

    const firstNode = unvisited.dequeue();

    if (firstNode.isWall) continue;
    visited.push(firstNode);

    if (firstNode === endNode) return visited;

    const neighborNodes = getUnvisitedNeighbors(firstNode, grid);

    for (const neighbor of neighborNodes) {
      neighbor.previousNode = firstNode;
    }

    neighborNodes.forEach( node => {
      node.isVisitedS = true;
      unvisited.enqueue(node);
    });
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors.filter((neighbor) => !neighbor.isVisitedS);
}

export function getShortestPathNodesBFS(lastNode) {

  const nodesInShortestPathOrder = [];
  let currentNode = lastNode;

  while (currentNode !== null) {

    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return nodesInShortestPathOrder;
}