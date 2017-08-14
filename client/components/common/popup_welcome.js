import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import styles from './popup.styl'
import buttonStyles from '../buttons/primary.styl'
import PrimaryButton from '../buttons/primary'
import { Form, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

const WelcomePopup = (props) => {
  const label = props.pollName ? "Join Poll" : "Create a Poll"
  const message = props.pollName ? "You're joining: " + props.pollName : "What's for lunch today?"
  return (
      <div className={styles.popup}>
        <div>
          <div className={styles.content}>
            {'Welcome to'}
          </div>
          <div className={styles.logo}>LunchBox</div>
        </div>
        <hr/>
        <div>
          <div className={classnames(styles.content, styles.message)}>
            {message}
          </div>
            <Form inline className={styles.form}>
              <FormGroup
                bsClass={styles.formGroup}>
                <ControlLabel className={styles.controlLabel}>Name: </ControlLabel>
                <FormControl className={styles.input} type="text" name="username" placeholder="Food Guru"onChange={props.onChange} required/>
              </FormGroup>
              <PrimaryButton
              className={buttonStyles.btnPopup}
              label={label}
              onClick={props.onClick}/>
            </Form>
        </div>
      </div>
    );
}

WelcomePopup.propTypes = {
  pollName: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

WelcomePopup.defaultProps = {
  pollName: ''
};

export default WelcomePopup
