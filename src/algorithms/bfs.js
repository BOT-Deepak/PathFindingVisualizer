
import Queue from "./queue";
import { getUnvisitedNeighbors } from "./multiUseFunctions";

export default function bfs(grid, startNode, endNode) {

  const unvisited = new Queue();
  const visited = [];

  unvisited.enqueue(startNode);
  startNode.isVisitedS = true;

  while(unvisited.length()) {

    const firstNode = unvisited.dequeue();

    if (firstNode.isWall) continue;
    visited.push(firstNode);

    if (firstNode === endNode) return visited;

    const neighborNodes = getUnvisitedNeighbors(firstNode, grid, 'S');

    for (const neighbor of neighborNodes) {
      neighbor.previousNode = firstNode;
    }

    neighborNodes.forEach( node => {
      node.isVisitedS = true;
      unvisited.enqueue(node);
    });
  }
}