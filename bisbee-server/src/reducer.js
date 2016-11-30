import { vote, setEntries, next, setEntry, INITIAL_STATE } from './core';

export default function reducer(state = INITIAL_STATE, action) {
  switch( action.type ){
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    case 'SET_ENTRY':
      return setEntry(state, action.entry);
    case 'NEXT':
      return next(state);
    case 'VOTE':
      return state.update('vote', voteState => vote(voteState, action.entry));
  }
  return state;
}
