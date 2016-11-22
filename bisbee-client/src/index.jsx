import React from 'react';
import { Route } from 'react-router';
import App from './components/App';
import Voting from './components/Voting';
import Results from './components/Results';
import './index.css';

export default (<Route component={ App }>
  <Route path="/" component={ Voting } />
  <Route path="results" component={ Results } />
</Route>);
