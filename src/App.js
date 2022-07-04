import React from "react";
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faHandSparkles, faMap, faRoute, faDownload } from "@fortawesome/free-solid-svg-icons";
import Visualizer from "./visualizers/Visualizer";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'jquery/dist/jquery.min.js'
import "./App.css";

export default function App() {
  return (
    <Router>
      <nav class="navbar navbar-expand-lg">
        <a class="navbar-brand webName" href="#"><FontAwesomeIcon icon={faRoute}></FontAwesomeIcon> Path Finding Visualizer</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav webBars">
            <li class="nav-item active bar">
              <Link to="/" class="nav-link"><FontAwesomeIcon icon={faHouse}></FontAwesomeIcon> Home</Link>
            </li>
            <li class="nav-item bar">
              <Link to="/tutorial" class="nav-link"><FontAwesomeIcon icon={faHandSparkles}></FontAwesomeIcon> Tutorial</Link>
            </li>
            <li class="nav-item bar">
              <Link to="/path" class="nav-link"><FontAwesomeIcon icon={faMap}></FontAwesomeIcon> Path Finder</Link>
            </li>
            <li class="nav-item bar">
              <a class="nav-link disabled" href="#"><FontAwesomeIcon icon={faDownload}></FontAwesomeIcon> Download</a>
            </li>
          </ul>
        </div>
      </nav>

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tutorial" element={<Tut />} />
          <Route path="/path" element={<Path />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function Tut() {
  return <h2>Tutorial</h2>;
}

function Path() {
  return (
    <div className="App">
      <Visualizer />
    </div>
  );
}