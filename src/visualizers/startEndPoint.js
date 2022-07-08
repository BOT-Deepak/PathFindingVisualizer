
export function startEndPoint() {

    let row_max_length = 20;
    let col_max_length = 40;

    let START_NODE_ROW = 0;
    let START_NODE_COL = 0;
    let FINISH_NODE_ROW = row_max_length-1;
    let FINISH_NODE_COL = col_max_length-1;

    return { rowMax: row_max_length, colMax: col_max_length,
        startRow: START_NODE_ROW, startCol: START_NODE_COL,
        finishRow: FINISH_NODE_ROW, finishCol: FINISH_NODE_COL };
}