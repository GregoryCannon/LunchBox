import React, { Component } from 'react';
import classnames from 'classnames'
import styles from './navbar.styl';
import { Navbar } from 'react-bootstrap';

const NavBar = (props) => {
  return (
    <Navbar className={styles.navbar}>
      <Navbar.Header className={styles.navbarHeader}>
          <a href="/" className={styles.logo}>LunchBox</a>
      </Navbar.Header>
    </Navbar>
  );
}

export default NavBar
