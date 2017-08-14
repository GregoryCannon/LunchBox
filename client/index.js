/**
 * Client entry point
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Router, Switch, Link} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import CreatePollPage from 'pages/create_poll/index';
import TakePollPage from 'pages/poll/index';
import ResultsPage from 'pages/results/index';
import Error from 'pages/error/index';

const App = () => (
  <Router history={createHistory()}>
    <Switch>
      <Route exact path="/" component={CreatePollPage} />
      <Route path="/polls/:id" component={TakePollPage}/>
      <Route path="/results/:id" component={ResultsPage}/>
      <Route path="*" component={Error} />
    </Switch>
  </Router>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
