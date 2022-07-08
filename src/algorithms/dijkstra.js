
import { sortNodesByDistance, getUnvisitedNeighbors, getAllNodes } from "./multiUseFunctions";

export default function dijkstra(grid, startNode, endNode) {

  const visitedNodesInOrder = [];
  startNode.distance = 0;

  const unvisitedNodes = getAllNodes(grid);

  while (unvisitedNodes.length) {

    sortNodesByDistance(unvisitedNodes);

    const current = unvisitedNodes.shift();

    if (current.isWall) continue;
    if (current.distance === Infinity) return visitedNodesInOrder;
    current.isVisitedS = true;

    visitedNodesInOrder.push(current);

    if (current === endNode) return visitedNodesInOrder;

    updateUnvisitedNeighbors(current, grid);
  }
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid, 'S');
  for (const neighbor of unvisitedNeighbors) {
    
    neighbor.distance = node.distance + neighbor.weight + 1; 
    neighbor.previousNode = node;
  }
}
