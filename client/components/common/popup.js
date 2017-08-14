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
      isClosable: this.props.message != ''
    }
  }

  handleClickOutside = (e) => {
    this.state.isClosable ? this.props.handleClickOutside(e) : null
  }

  makeClosable = () => {
    this.setState({isClosable: true})
  }

  render() {
    if (!this.props.message) {
      return (
        <WelcomePopup
          pollName={this.props.pollName}
          onChange={this.props.onChange}
          onClick={this.props.hidePopup}
        />
      )
    }
    return (
      <MessagePopup
        message={this.props.message}
        action={this.props.action}
        err={this.props.err}
        pollUrl={this.props.pollUrl}
        onClick={this.props.hidePopup}
        onCopy={this.makeClosable}
      />
    )
  }
}

Popup.propTypes = {
  action: PropTypes.string,
  message: PropTypes.string,
  err: PropTypes.bool,
  pollName: PropTypes.string,
  pollUrl: PropTypes.string,
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
