import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { Form, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

import styles from './popup.styl'
import buttonStyles from '../buttons/primary.styl'
import PrimaryButton from '../buttons/primary'
import WelcomePopup from './popup_welcome.js'
import MessagePopup from './popup_message.js'


const Popup = (props) => {
  const handleClickOutside = (e) => {
    if (!e.target.className.includes('popupOverlay')) return;

    if (props.parentPage == "createPoll" && props.pollUrl) {
      window.location.href = props.pollUrl
    } else if (props.parentPage == 'takePoll' && props.resultUrl){
      window.location.href = props.resultUrl
    }
  }

  return (
    <div
      className={classnames(styles.popupOverlay, {[styles.showing]: !props.showing})}
      onClick={handleClickOutside}
    >
      {
        props.message ?
          <MessagePopup
            message={props.message}
            parentPage={props.parentPage}
            err={props.err}
            pollName={props.pollName}
            pollUrl={props.pollUrl}
            resultUrl={props.resultUrl}
            onClick={props.hidePopup}
          />
        :
          <WelcomePopup
            pollName={props.pollName}
            username={props.username}
            alertMessage={props.alertMessage}
            onChange={props.onChange}
            onConfirmReturn={props.onConfirmReturn}
            onClick={props.onClick ? props.onClick : props.hidePopup}
          />
      }
    </div>
  );
}

Popup.propTypes = {
  showing: PropTypes.bool.isRequired,
  parentPage: PropTypes.string,
  message: PropTypes.string,
  err: PropTypes.bool,
  username: PropTypes.string,
  pollName: PropTypes.string,
  pollUrl: PropTypes.string,
  resultUrl: PropTypes.string,
  hidePopup: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  onClick: PropTypes.func
};

Popup.defaultProps = {
  parentPage: '',
  message: '',
  err: false,
  pollName: '',
  pollUrl: '',
};

export default Popup
