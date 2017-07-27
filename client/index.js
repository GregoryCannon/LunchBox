/**
 * Client entry point
 */

var ReactDOM = require('react-dom');
var React = require('react');
var Homepage = require('./pages/home/index.js')

console.log('Welcome to LunchBox!');

class App extends React.Component{
  render(){
  	return(
  		<Homepage/>
  		)
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
