import React from 'react';

function getPair(pair) {
  return pair || [ ];
}

function getVotes(entry, tally) {
  if( tally && tally.has(entry) ){
    return tally.get(entry);
  }
  return 0;
}

export default (props) => {
  return <div className="tally">
    { getPair(props.pair).map(entry =>
      <div key={ entry } className="entry">
        <h1>{ entry }</h1>
        <div className="voteCount">
          { getVotes(entry, props.tally) }
        </div>
      </div>
    )}
  </div>;
}
