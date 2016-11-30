import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import io from 'socket.io-client';
import reducer from './reducer';
import { Provider } from 'react-redux';
import Routes from './index.jsx';
import { setState } from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';

let socket;
if( location.hostname && location.protocol ){
  socket = io(`${location.protocol}//${location.hostname}:7777`);
} else {
  socket = io('http://localhost:7777');
}
const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
socket.on('state', state => {
  store.dispatch(setState(state));
});

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ hashHistory }>
      { Routes }
    </Router>
  </Provider>,
  document.getElementById('root')
);
