import Queue from "./queue";
import { runBfs } from "./multiUseFunctions";

export default function bidirectional(grid, startNode, endNode) {
    
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

        const bfsSResult = runBfs(grid, start_unvisited, start_visited, 'S');
        const bfsEResult = runBfs(grid, end_unvisited, end_visited, 'E');

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