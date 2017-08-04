import React from 'react';
import styles from './stylesheet.styl';

class Homepage extends React.Component{
  render() {
    return (
      <div className={styles.popup}>
      <div>
      <div className={styles.content}>Welcome to</div>
      <div className={styles.title}>LunchBox</div>
      </div>
      <form>
        <input type="text" name="username"/>
      </form>
      </div>
      );
  }
}

module.exports = Homepage;
