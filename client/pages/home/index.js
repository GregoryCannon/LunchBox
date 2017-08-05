import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './stylesheet.styl';
import classnames from 'classnames'
import { Form, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

class Homepage extends Component{
  render() {
    return (
      <div className={styles.popup}>
        <div>
          <div className={styles.content}>Welcome to</div>
          <div className={classnames(styles.content, styles.logo)}>LunchBox</div>
        </div>
        <hr/>
        <div>
          <div className={classnames(styles.content, styles.message)}>
            Please enter your name below:
          </div>
          <Form inline>
            <FormGroup>
              <ControlLabel className={classnames(styles.content, styles.message)}>Name:</ControlLabel>
              <FormControl type="text" name="username"/>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

export default Homepage
