import React from 'react';

function getPair(pair) {
  return pair || [];
}

function isDisabled(hasVoted) {
  // RETURN false IF undefined
  return !!hasVoted;
}

function hasVotedFor(hasVoted, entry) {
  return hasVoted === entry;
}

const Vote = (props) => {
  console.log('typeof pair:', typeof props.pair);
  return (<div className="voting">
    { getPair(props.pair).map(entry => {
      return (<button key={ entry }
               disabled={ isDisabled(props.hasVoted) }
               onClick={ () => props.vote(entry) }>
        <h1>{ entry }</h1>
        { hasVotedFor(props.hasVoted, entry) ?
          <div className="label">Voted</div> :
          null }
      </button>)
      }
    )}
  </div>);
}

Vote.propTypes = {
  pair: React.PropTypes.arrayOf(React.PropTypes.string),
  hasVoted: React.PropTypes.string
}

export default Vote;
