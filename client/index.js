/**
 * Client entry point
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Router, Switch, Link} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import homepage from './pages/home/index.js'
import poll from './pages/poll/index.js'
import createPollPage from './pages/create_poll/index.js'


class App extends React.Component{
  render(){
    return(
      <Router history={createHistory()}>
        <Switch>
          <Route exact path="/" component={homepage}/>
          <Route path="/poll" component={createPollPage}/>
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
