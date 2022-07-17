import React, { Component } from "react";

import "./Node.css";

export default class Node extends Component {

  constructor(props) {

    super(props);
    
    this.state = {};
  }

  render() {
    
    const { row,col,isFinish,isStart,isWall, isFlag, onMouseDown,onMouseEnter,onMouseUp,isWeight1,isWeight2,isWeight3,isWeight4,isWeight5 } = this.props;

    const extraClassName = isFinish
      ? "node-finish"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : isFlag
      ? "node-flag"
      : isWeight1
      ? "node-weight-1"
      : isWeight2
      ? "node-weight-2"
      : isWeight3
      ? "node-weight-3"
      : isWeight4
      ? "node-weight-4"
      : isWeight5
      ? "node-weight-5"
      : "";

    return (
      <td
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      ></td>
    );
  }
}