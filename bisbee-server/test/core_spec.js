import { List, Map } from 'immutable';
import { expect } from 'chai';

import { setEntries, setEntry, next, vote } from '../src/core';

describe('Application logic', () => {

  describe('setEntries', () => {

    it('should add the entries to the state', () => {
      const state = Map();
      const entries = [ 'Trainspotting', '28 Days Later' ];
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 Days Later')
      }))
    })
  });

  describe('setEntry', () => {

    it('should create List of entries when none exist', () => {
      const initialState = Map();
      const nextState = setEntry(initialState, 'Trainspotting');

      expect(nextState).to.equal(Map({
        entries: List([ 'Trainspotting' ])
      }));
    })

    it('should add entry to List of entries', () => {
      const initialState = Map({
        entries: List.of('Trainspotting', 'Millions', 'Sunshine')
      });
      const nextState = setEntry(initialState, '28 Days Later');

      expect(nextState).to.equal(Map({
        entries: List([ 'Trainspotting', 'Millions', 'Sunshine', '28 Days Later' ])
      }));
    });

    it('should preserve submission order', () => {
      const initialState = Map();
      const firstState = setEntry(initialState, 'Trainspotting');
      const secondState = setEntry(firstState, '28 Days Later');
      const thirdState = setEntry(secondState, 'Sunshine');
      const finalState = setEntry(thirdState, 'Millions');

      expect(finalState).to.equal(Map({
        entries: List([ 'Trainspotting', '28 Days Later', 'Sunshine', 'Millions' ])
      }));
    });
  });

  describe('next', () => {

    it('should take the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later')
        }),
        entries: List.of('Sunshine')
      }));
    })

    it('should put winner of current vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 4,
            '28 Days Later': 2
          })
        }),
        entries: List.of('Sunshine', 'Millions', '127 Hours')
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Sunshine', 'Millions')
        }),
        entries: List.of('127 Hours', 'Trainspotting')
      }));
    })

    it('should return both entries to queue in event of tie', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 3,
            '28 Days Later': 3
          })
        }),
        entries: List.of('Sunshine', 'Millions', '127 Hours')
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Sunshine', 'Millions'),
        }),
        entries: List.of('127 Hours', 'Trainspotting', '28 Days Later')
      }));
    })

    it('should mark winner when just one entry left', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '128 Days Later'),
          tally: Map({
            'Trainspotting': 4,
            '128 Days Later': 2
          })
        }),
        entries: List()
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        winner: 'Trainspotting'
      }));
    })
  });

  describe('vote', () => {

    it('should create a tally for the voted entry', () => {
      const state = Map({
        pair: List.of('Trainspotting', '28 Days Later')
      });
      const nextState = vote(state, 'Trainspotting');

      expect(nextState).to.equal(Map({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          'Trainspotting': 1
        })
      }));
    })

    it('should add to existing tally for the voted entry', () => {
      const state = Map({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          'Trainspotting': 3,
          '28 Days Later': 2
        })
      });
      const nextState = vote(state, 'Trainspotting');

      expect(nextState).to.equal(Map({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          'Trainspotting': 4,
          '28 Days Later': 2
        })
      }))
    })
  });
})
