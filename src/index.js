import React from 'react';
import ReactDOM from 'react-dom';

import 'jquery/dist/jquery.min.js'
import $ from "jquery";
import './index.css';

import App from './App';

ReactDOM.render(

  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

$('body,html').css("overflow","hidden");

