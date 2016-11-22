import React from 'react';

import Winner from './Winner';
import Tally from './Tally';
import Next from './Next';

export default (props) => {
  return props.winner ?
  <Winner winner={ props.winner} /> :
  <div className="results">
    <Tally { ...props } />
    <Next { ...props } />
  </div>;
}
