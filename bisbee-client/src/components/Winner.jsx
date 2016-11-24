import React from 'react';

const Winner = (props) => {
  return (<div className="winner">
    Winner is { props.winner }
  </div>);
}

Winner.propTypes = {
  winner: React.PropTypes.string.isRequired
};

export default Winner;
