import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
import Routes from './index.jsx';

ReactDOM.render(
  <Router history={ hashHistory }>
    { Routes }
  </Router>,
  document.getElementById('root')
);
