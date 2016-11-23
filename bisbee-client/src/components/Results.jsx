import React from 'react';
import { connect } from 'react-redux';

import Winner from './Winner';
import Tally from './Tally';
import Next from './Next';

const Results = (props) => {
  return props.winner ?
  <Winner winner={ props.winner} /> :
  <div className="results">
    <Tally { ...props } />
    <Next { ...props } />
  </div>;
}

function mapStateToProps(state) {
  return {
    pair: state.getIn([ 'vote', 'pair' ]),
    tally: state.getIn([ 'vote', 'tally' ]),
    winner: state.get('winner')
  }
}

export default connect(mapStateToProps)(Results);
