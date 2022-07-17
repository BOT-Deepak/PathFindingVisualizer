import React, { Component } from "react";
import Node from "../components/Node";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'jquery/dist/jquery.min.js'
import $ from "jquery";
import "./Visualizer.css";

import { startEndPoint } from "./startEndPoint";
import dijkstra from "../algorithms/dijkstra";
import { getShortestPathNodes, getShortestPathNodesBD } from "../algorithms/multiUseFunctions";
import bfs from "../algorithms/bfs";
import bidirectional from "../algorithms/bidirectional";
import bellmanford from "../algorithms/bellmanford";
import aStarAlgo from "../algorithms/aStarAlgo";

const pos = startEndPoint();

const getGridInitial = () => {
  
  const grid = [];

  for (let row = 0; row < pos.rowMax; row++) {

    const currentRow = [];
    for (let col = 0; col < pos.colMax; col++) currentRow.push(createNode(row, col));
    grid.push(currentRow);
  }

  return grid;
};

const createNode = (row, col) => {

  return {
    row, col,
    isStart: row === pos.startRow && col === pos.startCol,
    isFinish: row === pos.finishRow && col === pos.finishCol,
    distance: Infinity,
    isVisitedS: false, isVisitedE: false, isVisitedF: false, f: 0,
    isWall: false, isWeight: false, previousNode: null, nextNode: null, weight: 0, isFlag: false,
    isWeight1: false, isWeight2: false, isWeight3: false, isWeight4: false, isWeight5: false,
  };
};

const getWallGrid = (grid, row, col) => {

  const newGrid = [...grid];
  const node = newGrid[row][col];

  const newNode = {...node, isWall: !node.isWall,};
  newGrid[row][col] = newNode;

  return newGrid;
};

const getFlagGrid = (grid, row, col) => {

  const newGrid = [...grid];
  const node = newGrid[row][col];
  
  const newNode = {...node, isFlag: !node.isFlag,};
  newGrid[row][col] = newNode;

  return newGrid;
};

const getWeightedGrid = (grid, row, col, weight) => {

  const newGrid = [...grid]; 
  const node = newGrid[row][col];
  
  const newNode = {...node, isWeight: !node.isWeight, weight: parseInt(weight)};


  switch (parseInt(weight))
  {
    case 1:
      newNode.isWeight1 = true;
      break;
    case 2:
      newNode.isWeight2 = true;
      break;
    case 3:
      newNode.isWeight3 = true;
      break;
    case 4:
      newNode.isWeight4 = true;
      break;
    case 5:
      newNode.isWeight5 = true;
      break;
    default:
      break;
  }

  if(!newNode.isWeight)
  {
    newNode.isWeight1 = false;
    newNode.isWeight2 = false;
    newNode.isWeight3 = false;
    newNode.isWeight4 = false;
    newNode.isWeight5 = false;
  }

  newGrid[row][col] = newNode;
  
  return newGrid;
};

export default class Visualizer extends Component {

  constructor() {

    super();

    this.state = {
      grid: [], mouseIsPressed: false,
      topMessage: "Dijkstra Algorithm", buttonText: "Dijkstra Algorithm",
      weight: 1, changeWeight: false, distanceToBeTraveled: 0, changeFlag: false,
    };
  }

  algoChange = () => {
    const selectedText = $('#seeAlgo').val();
    const grid = getGridInitial();
    this.setState({ topMessage: selectedText, buttonText: selectedText, grid });
  }

  componentDidMount() {
    const grid = getGridInitial();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {

    if (this.state.topMessage.split(' ')[1] !== "Algorithm") return;
    let newGrid = [];

    if (this.state.changeWeight) newGrid = getWeightedGrid(this.state.grid, row, col, this.state.weight);
    else if(this.state.changeFlag) newGrid = getFlagGrid(this.state.grid, row, col);
    else newGrid = getWallGrid(this.state.grid, row, col);

    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMousePressed(row, col) {
    if (this.state.topMessage.split(' ')[1] !== "Algorithm" || this.state.changeFlag) return;
    if (!this.state.mouseIsPressed) return;
    let newGrid = [];

    if (this.state.changeWeight) newGrid = getWeightedGrid(this.state.grid,row,col,this.state.weight);
    else newGrid = getWallGrid(this.state.grid, row, col);
    
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    if (this.state.topMessage.split(' ')[1] !== "Algorithm") return;
    this.setState({ mouseIsPressed: false });
  }


  checkAlgo() {

    switch (this.state.topMessage.split(' ')[0])
    {
      case "Dijkstra":
        this.visualizeDijkstra();
        break;
      case "BFS":
        this.visualizeBfs();
        break;
      case "Bidirectional":
        this.visualizeBiDirectional();
        break;
      case "Bellman-Ford":
        this.visualizeBellmanFord();
        break;
      case "A-Star":
        this.visualizeAStar();
        break;
      default:
        break;
    }
  }

  visualizeDijkstra() {

    this.setState({ topMessage: "Running Algo" });
    const { grid } = this.state;

    const startNode = grid[pos.startRow][pos.startCol];
    const finishNode = grid[pos.finishRow][pos.finishCol];

    const visitedNodes = dijkstra(grid, startNode, finishNode);
    const shortestPathNodes = getShortestPathNodes(finishNode);

    this.animate(visitedNodes, shortestPathNodes);
  }

  visualizeBfs() {

    this.setState({ topMessage: "Running Algo" });
    const { grid } = this.state;

    const startNode = grid[pos.startRow][pos.startCol];
    const finishNode = grid[pos.finishRow][pos.finishCol];

    const visitedNodes = bfs(grid, startNode, finishNode);
    const shortestPathNodes = getShortestPathNodes(finishNode);

    this.animate(visitedNodes, shortestPathNodes);
  }

  visualizeBiDirectional() {

    this.setState({ topMessage: "Running Algo" });
    const { grid } = this.state;

    const startNode = grid[pos.startRow][pos.startCol];
    const finishNode = grid[pos.finishRow][pos.finishCol];

    const param = bidirectional(grid, startNode, finishNode);

    console.log(param.sVisited);

    const shortestPathNodes = getShortestPathNodesBD(param.intersectNode);

    this.animateBD(param.sVisited, param.eVisited, shortestPathNodes);
  }

  visualizeBellmanFord() {

    this.setState({ topMessage: "Running Algo" });
    const { grid } = this.state;

    const startNode = grid[pos.startRow][pos.startCol];
    const finishNode = grid[pos.finishRow][pos.finishCol];

    const { visitedNodes, timeTaken, shortestPathNodes} = bellmanford(grid, startNode, pos.rowMax, pos.colMax, finishNode);
    
    this.animateBF(visitedNodes, {timeTaken, shortestPathNodes});
  }

  visualizeAStar() {

    this.setState({ topMessage: "Running Algo" });
    const { grid } = this.state;

    const startNode = grid[pos.startRow][pos.startCol];
    const finishNode = grid[pos.finishRow][pos.finishCol];

    const { visitedNodesE, timeTaken} = aStarAlgo(grid, startNode, pos.rowMax, pos.colMax, finishNode);

    const shortestPathNodes = getShortestPathNodes(finishNode);

    this.animateBF(visitedNodesE, {timeTaken, shortestPathNodes});
  }
  
  animate(visitedNodes, shortestPathNodesMaybe) {

    for (let i = 1; i <= visitedNodes.length; i++) {

      if (i === visitedNodes.length) {
        setTimeout(() => {this.animateShortestPath(shortestPathNodesMaybe);}, 10 * i);
        return;
      }

      if (i === visitedNodes.length-1) continue;

      setTimeout(() => {
        const node = visitedNodes[i];
        if (node.isWeight) $(`#node-${node.row}-${node.col}`).addClass("node-visitedWeight");
        else $(`#node-${node.row}-${node.col}`).addClass("node-visited");
      }, 10 * i);
    }
  }

  animateBD(sVisitedNodes, eVisitedNodes, shortestPathNodes) {

    const sizeMax = sVisitedNodes.length > eVisitedNodes.length ? sVisitedNodes.length : eVisitedNodes.length;

    for (let i = 1; i <= sizeMax; i++) {

      if (i === sizeMax) {
        setTimeout(() => {this.animateShortestPath(shortestPathNodes);}, 10 * i);
        return;
      }

      setTimeout(() => {
          if(i < sVisitedNodes.length) {
              const node = sVisitedNodes[i];
              $(`#node-${node.row}-${node.col}`).addClass("node-visited");
          }

          if(i < eVisitedNodes.length) {
              const node = eVisitedNodes[i];
              $(`#node-${node.row}-${node.col}`).addClass("node-visited");
          }
      }, 10 * i);
    }
  }

  animateBF(visitedNodes, shortestPathNodesMaybe) {
    for (let i = 1; i <= visitedNodes.length; i++) {

      if (i === visitedNodes.length) {
        setTimeout(() => {this.animateShortestPath(shortestPathNodesMaybe);}, 10 * i);
        return;
      }

      if (i === visitedNodes.length-1) continue;

      setTimeout(() => {
        const node = visitedNodes[i];
        if (node.isWeight) $(`#node-${node.row}-${node.col}`).addClass("node-visitedWeight");
        else $(`#node-${node.row}-${node.col}`).addClass("node-visited");
      }, 10 * i);

      setTimeout(() => {this.removeOlderVisited(visitedNodes, i)}, 2 * i);
    }
  }

  removeOlderVisited(visitedNodes, i) {

    setTimeout(() => {
      const node = visitedNodes[i];
      if (node.isWeight) $(`#node-${node.row}-${node.col}`).removeClass("node-visitedWeight");
      else $(`#node-${node.row}-${node.col}`).removeClass("node-visited");
    }, 10 * i);
  }

  animateShortestPath(shortestPathNodesMaybe) {
    let timeTaken = 0;
    this.setState({ topMessage: "Shortest Path" });

    let shortestPathNodes = shortestPathNodesMaybe;
    if(this.state.buttonText === "Bellman-Ford Algorithm" || this.state.buttonText === "A-Star Algorithm") shortestPathNodes = shortestPathNodesMaybe.shortestPathNodes;

    for (let i = 1; i < shortestPathNodes.length - 1; i++) {

      setTimeout(() => {
        const node = shortestPathNodes[i];
        if (shortestPathNodes[i].isWeight) {

          const wei = shortestPathNodes[i].weight;
          const weig = "node-path-" + wei;

          $(`#node-${node.row}-${node.col}`).removeClass("node-visitedWeight").addClass(weig);
        }
        else $(`#node-${node.row}-${node.col}`).removeClass("node-visited").addClass("node-path");
      }, 50 * i);
    }

    if(this.state.buttonText === "BFS Algorithm" || this.state.buttonText == "Bidirectional Algorithm") timeTaken = shortestPathNodes.length -1;
    if(this.state.buttonText === "Dijkstra Algorithm") timeTaken = shortestPathNodes[shortestPathNodes.length - 1].distance;
    if(this.state.buttonText == "Bellman-Ford Algorithm" || this.state.buttonText === "A-Star Algorithm") timeTaken = shortestPathNodesMaybe.timeTaken;

    this.setState({ distanceToBeTraveled: timeTaken });
  }

  weightChangeHandler = (event) => this.setState({ weight: event.target.value });

  pointChangeHandler = () => {
    
    if (this.notCorrect()) return;

    $(`#node-${pos.startRow}-${pos.startCol}`).removeClass("node-start");
    $(`#node-${pos.finishRow}-${pos.finishCol}`).removeClass("node-finish");

    pos.startRow = parseInt($("#start_row").val());pos.startCol = parseInt($("#start_col").val());
    pos.finishRow = parseInt($("#end_row").val());pos.finishCol = parseInt($("#end_col").val());

    $(`#node-${pos.startRow}-${pos.startCol}`).addClass("node-start");
    $(`#node-${pos.finishRow}-${pos.finishCol}`).addClass("node-finish");
  };

  notCorrect = () => {

    if (isNaN(parseInt($("#start_row").val())) || isNaN(parseInt($("#start_col").val())) ||
      isNaN(parseInt($("#end_row").val())) || isNaN(parseInt($("#end_col").val()))) return true;

    if (parseInt($("#start_row").val()) > pos.rowMax || parseInt($("#start_col").val()) > pos.colMax ||
      parseInt($("#start_row").val()) < 0 || parseInt($("#start_col").val()) < 0 ||
      parseInt($("#end_row").val()) > pos.rowMax || parseInt($("#end_col").val()) > pos.colMax ||
      parseInt($("#end_row").val()) < 0 || parseInt($("#end_col").val())  < 0) return true;

    return false;
  };

  toggleWeight = () => {
    const temp = this.state.changeWeight;this.setState({ changeWeight: !temp });
  };

  toggleFlag = () => {
    const temp = this.state.changeFlag;this.setState({ changeFlag: !temp });
  };

  render() {

    const { grid, mouseIsPressed, topMessage, distanceToBeTraveled } = this.state;

    let mainButton = (

      <p className="startButton" onClick={() => this.checkAlgo()}>
        <FontAwesomeIcon icon={faCirclePlay}></FontAwesomeIcon> Start {topMessage}
      </p>
    );

    if(topMessage.split(" ")[0] === "Bellman-Ford") {

      mainButton = (

        <p className="startButton" onClick={() => this.checkAlgo()}>
          <FontAwesomeIcon icon={faCirclePlay}></FontAwesomeIcon> Start {topMessage}
          <small> ( Not for -ve Weight Cycles in this grid ) </small>
        </p>
      );
    }

    if(topMessage.split(" ")[0] === "A-Star") {

      mainButton = (

        <p className="startButton" onClick={() => this.checkAlgo()}>
          <FontAwesomeIcon icon={faCirclePlay}></FontAwesomeIcon> Start {topMessage}
          <small> ( Fixed Heuristics ) </small>
        </p>
      );
    }

    let detailsBox = null;

    if (topMessage === "Shortest Path") {

      detailsBox = (

        <div>
          <label htmlFor="text">
            Time : {distanceToBeTraveled}</label>
          <small><br />{this.state.buttonText.split(' ')[0] === "Dijkstra" || this.state.buttonText.split(' ')[0] === "Bellman-Ford" || this.state.buttonText.split(' ')[0] === "A-Star" ? " [1 Block takes 1 unit of Time to travel and x units of Weight takes x units of more Time to travel] " : " [1 Block takes 1 unit of Time to travel] "}</small>
        </div>
      );
      
      mainButton = (

        <div class="resetButtonDiv">
          <h2 className="resetButton" href="#"
            onClick={() => window.location.reload(false)} >Reset</h2>
        </div>
      );
    } else if (topMessage === "Running Algo") mainButton = <h3 className="running">Running...</h3>;

    let changeWeightText = "False";
    if (this.state.changeWeight) changeWeightText = "True";

    let changeFlagText = "False";
    if(this.state.changeFlag) changeFlagText = "True";

    let setWeightSection = null;
    
    if(changeWeightText === "True") {

      setWeightSection = (

        <div class="setWeightContainer">
          <label htmlFor="quantity">Set Weight :</label>
          <input type="number" id="quantity" name="quantity" min="1" max="5"
            onChange={this.weightChangeHandler} defaultValue="1" />
        </div>
      );
    }

    let weightSection = null, flagSection = null;

    if(topMessage.split(" ")[0] === "Dijkstra" || topMessage.split(" ")[0] === "Bellman-Ford" || topMessage.split(" ")[0] === "A-Star") {

      weightSection = (
        <div className="weightSection">

          <label htmlFor="quantity">Toggle Weight :</label>
          <button onClick={this.toggleWeight}>{changeWeightText}</button>
          <br />

          {setWeightSection}

          <hr></hr>
        </div>
      );
    }

    if(topMessage.split(" ")[0] === "Bellman-Ford") {

      flagSection = (
        <div className="flagSection">

          <label htmlFor="quantity">Toggle Flag :</label>
          <button onClick={this.toggleFlag}>{changeFlagText}</button>

          <hr></hr>
        </div>
      );
    }

    let centreBox = (

      <div className="centreBox">

        <div className="startPoints">

          <label htmlFor="point">Start Point :</label>

          <input type="number" name="point" id="start_row" min="0" max={pos.rowMax - 1}
            onChange={this.pointChangeHandler} defaultValue="0" />

          <input type="number" name="point" id="start_col" min="0" max={pos.colMax - 1}
            onChange={this.pointChangeHandler} defaultValue="0" />

        </div>

        <div className="endPoints">

          <label htmlFor="point">End Point :</label>

          <input type="number" name="point" id="end_row" min="0" max={pos.rowMax - 1}
            onChange={this.pointChangeHandler} defaultValue={pos.rowMax - 1} />

          <input type="number" name="point" id="end_col" min="0" max={pos.colMax - 1}
            onChange={this.pointChangeHandler} defaultValue={pos.colMax - 1} />
            
        </div>

        <hr></hr>

        {weightSection}

        {flagSection}

        <div className="algoChangeSection">
          <label htmlFor="algo">Algorithm's Available :</label>

          <div class="setAlgoContainer">
            <select name="algo" id="seeAlgo" onChange={() => this.algoChange()}>

              <option value="Dijkstra Algorithm">Dijkstra Algorithm</option>
              {/* <option value="BFS Algorithm">BFS Algorithm</option> */}
              <option value="Bidirectional Algorithm">Bidirectional Search</option>
              <option value="Bellman-Ford Algorithm">Bellman-Ford Algorithm</option>
              <option value="A-Star Algorithm">A* Algorithm</option>
            </select>
          </div>
        </div>

      </div>
    );

    if (topMessage === "Running Algo") centreBox = null;
    else if (topMessage === "Shortest Path") centreBox = ( <div className="detailsContainer">{detailsBox}</div> );

    return (

      <div className="visualizerBox">
        <div className="container shadow-lg p-4 mb-5 rounded">
          <div className="heading"> {topMessage} </div>
          <hr></hr>

          {centreBox}
          
          <hr></hr>

          <div class="startButtonSection">
            <button type="button" class="btn btn-outline-success startButton">{mainButton}</button>
          </div>

        </div>

        <div className="visualGridContainer">

          <div className="gridBox arrowClass">
            
            <table className="grid" style={{ borderSpacing: "1" }}>
              <tbody>{grid.map((row, rowIndex) => {
                  
                  return (<tr key={rowIndex}>{row.map((node, nodeIndex) => {
                        const { isStart, isFinish, isWall, isFlag, isWeight1, isWeight2, isWeight3, isWeight4, isWeight5 } = node;
                        
                        return (
                          <Node
                            row={rowIndex}
                            col={nodeIndex}
                            key={rowIndex + "-" + nodeIndex}
                            isStart={isStart}
                            isFinish={isFinish}
                            isWall={isWall}
                            isFlag={isFlag}
                            isWeight1={isWeight1}
                            isWeight2={isWeight2}
                            isWeight3={isWeight3}
                            isWeight4={isWeight4}
                            isWeight5={isWeight5}
                            mouseIsPressed={mouseIsPressed}

                            onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                            onMouseEnter={(row, col) => this.handleMousePressed(row, col)}
                            onMouseUp={() => this.handleMouseUp()} />
                        );
                      })}</tr>);})}</tbody></table>
          </div>
        </div>
      </div>
    );
  }
}
