import React, { Component } from 'react'
import classnames from 'classnames'
import { PropTypes as ptypes } from 'prop-types'
import styles from './stylesheet.styl'
import PrimaryButton from '../buttons/button_primary'
import { Form, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

const Popup = (props) => {
  const label = props.voting ? "Join Poll" : "Create a Poll"
  const message = props.voting ? "You're joining: " + props.pollCreater +"'s Lunch Poll": "What's for lunch today?"
  return (
      <div className={styles.popup}>
        <div>
          <div className={styles.content}>Welcome to</div>
          <div className={styles.logo}>LunchBox</div>
        </div>
        <hr/>
        <div>
          <div className={classnames(styles.content, styles.message)}>
            {message}
          </div>
          <Form inline className={styles.form}>
            <FormGroup bsClass={styles.formGroup}>
              <ControlLabel className={styles.controlLabel}>Name: </ControlLabel>
              <FormControl className={styles.input} type="text" name="username" placeholder="Food Guru"/>
            </FormGroup>
          </Form>
          <PrimaryButton label={label}/>
        </div>
      </div>
    );
}

Popup.propTypes = {
  voting: ptypes.bool,
  pollCreater: ptypes.string
};

Popup.defaultProps = {
  voting: false,
  pollCreater: ''
};


export default Popup
