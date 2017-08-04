import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Router, Switch, Link} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Homepage from 'pages/home/index';
import Poll from 'pages/poll/index';
import Error from 'pages/error/index';

class App extends Component{
  render(){
    return(
      <Router history={createHistory()}>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/poll" component={Poll} />
          <Route path="*" component={Error} />
        </Switch>
      </Router>
    )
  }
}
