import React from 'react';

export default (props) => {
  return <div className="management">
    <button className="next"
            onClick={ props.next }>
      Next
    </button>
  </div>
}
