import React from 'React';
import Winner from './Winner';
import Vote from './Vote';

export default voting = props => {
  (<div>
    { this.props.winner ?
      <Winner ref="winner" winner={ this.props.winner } /> :
      <Vote { ...this.props } /> }
  </div>);
}
