import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link} from 'react-router-dom';
var homepage = require('./pages/home/index.js')


class App extends React.Component{
  render(){
    return(
      <Router>
        <div>
        <Route exact path="/" component={homepage}/>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

