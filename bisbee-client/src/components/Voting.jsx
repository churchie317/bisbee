import React from 'react';
import { connect } from 'react-redux';

import { vote } from '../action_creators';
import Winner from './Winner';
import Vote from './Vote';

const Voting = (props) => {
  return (<div>
    { props.winner ?
      <Winner winner={ props.winner } /> :
      <Vote { ...props } /> }
  </div>);
}

function mapDispatchToProps(dispatch) {
  return {
    vote: (entry) => dispatch(vote(entry))
  };
}

function mapStateToProps(state) {
  return {
    pair: state.getIn([ 'vote', 'pair' ]),
    winner: state.get('winner'),
    hasVoted: state.get('hasVoted')
  };
}

const VotingContainer = connect(mapStateToProps, mapDispatchToProps)(Voting);

export default VotingContainer;
