/**
 * Client entry point
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Router, Switch, Link} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
var homepage = require('./pages/home/index.js')
var poll = require('./pages/poll/index.js')


class App extends React.Component{
  render(){
    return(
      <Router history={createHistory()}>
        <Switch>
          <Route exact path="/" component={homepage}/>
          <Route path="/poll" component={poll}/>
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
