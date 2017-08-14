import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import styles from './popup.styl'
import buttonStyles from '../buttons/primary.styl'
import PrimaryButton from '../buttons/primary'
import { Form, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

class WelcomePopup extends Component {

  constructor(props) {
    super(props)
    this.state = {
      retrying: false,
      onClick: props.onClick,
    }
  }

  retry = (e) => {
    if (e.key == 'Enter') {
      this.state.onClick()
    } else if (this.props.alertMessage) {
      this.setState({ retrying: true })
    }
  }

  componentWillReceiveProps(nextProps) {
    var label, message, onClick
    if (nextProps.alertMessage && !this.state.retrying && this.props.username) {
      label = "That was me"
      onClick = nextProps.onConfirmReturn
    } else {
      label = nextProps.pollName ? "Join Poll" : "Create a Poll"
    }
    message = nextProps.pollName ? "You're joining: " + nextProps.pollName : "What's for lunch today?"
    this.state = {
      label: label,
      message: message,
      onClick: onClick ? onClick : this.state.onClick
    }
  }

  render() {
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
              {this.state.message}
            </div>
              <div className={styles.form}>
                <FormGroup
                  bsClass={styles.formGroup}>
                  <ControlLabel className={styles.controlLabel}>Name: </ControlLabel>
                  <FormControl
                    className={styles.input}
                    type="text" name="username"
                    placeholder="Food Guru"
                    onChange={this.props.onChange}
                    onKeyDown={this.retry}
                    required/>
                </FormGroup>
                {this.props.alertMessage &&
                  <div
                    className={styles.alertMessage}
                  >
                    {this.props.alertMessage}
                  </div>}
                <PrimaryButton
                className={buttonStyles.btnPopup}
                label={this.state.label}
                onClick={this.state.onClick}/>
              </div>
          </div>
        </div>
      );
  }
}

WelcomePopup.propTypes = {
  pollName: PropTypes.string,
  alertMessage: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

WelcomePopup.defaultProps = {
  pollName: ''
};

export default WelcomePopup
