import { List, Map } from 'immutable';

export const INITIAL_STATE = Map();

// For development use
export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

// For production use
export function setEntry(state, entry) {
  if( List.isList(state.get('entries')) ){
    return state.setIn([ 'entries' ], state.getIn([ 'entries' ]).push(entry));
  }
  return state.set('entries', List.of(entry));
}

function getWinners(vote) {
  if( !vote ){
    return [];
  }

  const [ a, b ] = vote.get('pair');
  const aVotes = vote.getIn([ 'tally', a ], 0);
  const bVotes = vote.getIn([ 'tally', b ], 0);

  if( aVotes > bVotes ){
    return [ a ];
  } else if( aVotes < bVotes ){
    return [ b ];
  } else {
    return [ a, b ];
  }
}

export function next(state) {
  const entries = state.get('entries').concat(getWinners(state.get('vote')));

  if( entries.size === 1 ){
    return state.set('winner', entries.first(1))
                .remove('vote')
                .remove('entries');
  }

  return state.merge({
    vote: Map({ pair: entries.take(2) }),
    entries: entries.skip(2)
  });
}

export function vote(voteState, entry) {
  return voteState.updateIn(
    [ 'tally', entry ],
    // IF undefined, assign value of zero
    0,
    // ELSE, increment
    tally => tally + 1
  );
}
