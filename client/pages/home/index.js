import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './stylesheet.styl';

class Homepage extends Component{
  render() {
    return (
      <div>
        <h3>You are joining Sigas Lunch Poll</h3>
        <img src="app/images/check.ico" width="50px"/>
        <form>
          <input placeholder="enter your name"/>
          <button>Join</button>
          <p><font color="red">This name is already used, please enter a different name</font></p>
          <button>That was me, I want to edit my votes</button>
        </form>
        <Link to='/poll'>Go To Poll Screen</Link>
      </div>
    );
  }
}

export default Homepage
