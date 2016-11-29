import React from 'react';
import { connect } from 'react-redux';
import { next } from '../action_creators';

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

function mapDispatchToProps(dispatch) {
  return {
    next: dispatch(next())
  }
}

function mapStateToProps(state) {
  return {
    pair: state.getIn([ 'vote', 'pair' ]),
    tally: state.getIn([ 'vote', 'tally' ]),
    winner: state.get('winner')
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);
