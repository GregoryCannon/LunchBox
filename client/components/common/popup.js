import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { Form, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import onClickOutside from 'react-onclickoutside';

import styles from './popup.styl'
import buttonStyles from '../buttons/primary.styl'
import PrimaryButton from '../buttons/primary'
import WelcomePopup from './popup_welcome.js'
import MessagePopup from './popup_message.js'


class Popup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isClosable: (props.action != 'createPoll' && props.action != 'submitVotes')
    }
  }

  handleClickOutside = (e) => {
    if (this.props.action == "createPoll" && this.props.pollUrl) {
      window.location.href = this.props.pollUrl
    } else {
      this.state.isClosable ? this.props.handleClickOutside(e) : null
    }
  }

  makeClosable = () => {
    this.setState({isClosable: true})
  }

  render() {
    if (!this.props.message) {
      return (
        <WelcomePopup
          pollName={this.props.pollName}
          username={this.props.username}
          alertMessage={this.props.alertMessage}
          onChange={this.props.onChange}
          onConfirmReturn={this.props.onConfirmReturn}
          onClick={this.props.action == "submitVotes" ? this.props.onClick : this.props.hidePopup}
        />
      )
    }
    return (
      <MessagePopup
        message={this.props.message}
        action={this.props.action}
        err={this.props.err}
        pollName={this.props.pollName}
        pollUrl={this.props.pollUrl}
        resultUrl={this.props.resultUrl}
        onClick={this.props.hidePopup}
      />
    )
  }
}

Popup.propTypes = {
  action: PropTypes.string,
  message: PropTypes.string,
  err: PropTypes.bool,
  username: PropTypes.string,
  pollName: PropTypes.string,
  pollUrl: PropTypes.string,
  resultUrl: PropTypes.string,
  hidePopup: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

Popup.defaultProps = {
  action: '',
  message: '',
  err: false,
  pollName: '',
  pollUrl: '',
};

export default onClickOutside(Popup)
