import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './stylesheet.styl';
import classnames from 'classnames'

class Homepage extends Component{
  render() {
    return (
      <div className={styles.popup}>
        <div>
          <div className={styles.content}>Welcome to</div>
          <div className={classnames(styles.content, styles.logo)}>LunchBox</div>
        </div>
        <hr/>
        <form>
          <input type="text" name="username"/>
        </form>
      </div>
    );
  }
}

export default Homepage
