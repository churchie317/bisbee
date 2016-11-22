import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';

describe('reducer', () => {

  it('should handle SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_ENTRIES',
      state: Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({ 'Trainspotting': 1 })
        })
      })
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: [ 'Trainspotting', '28 Days Later' ],
        tally: {
          'Trainspotting': 1
        }
      }
    }));
  })
})
