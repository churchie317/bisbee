import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
import { createStore } from 'redux';
import reducer from './reducer';
import { Provider } from 'react-redux';
import Routes from './index.jsx';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
store.dispatch({
  type: 'SET_STATE',
  state: {
    vote: {
      pair: [ 'Trainspotting', '28 Days Later' ],
      tally: {
        'Sunshine': 2
      }
    }
  }
});

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ hashHistory }>
      { Routes }
    </Router>
  </Provider>,
  document.getElementById('root')
);
