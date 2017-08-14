import React from 'react'
import classnames from 'classnames'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import CopyToClipboard from 'react-copy-to-clipboard';

import styles from './popup.styl'
import buttonStyles from '../buttons/primary.styl'
import PrimaryButton from '../buttons/primary'

const MessagePopup = (props) => {
  var content
  if (props.action === "createPoll") {
    content = !props.err ? (
                <CopyToClipboard
                  text={props.pollUrl}
                  onCopy={props.onCopy}>
                    <PrimaryButton
                    className={buttonStyles.btnPopup}
                    label={"Copy Link"}/>
                </CopyToClipboard>
              ) : (
                <PrimaryButton
                  className={buttonStyles.btnPopup}
                  label={"Try Again"}
                  onClick={props.onClick}
                />
              )
  } else if (props.action === "submitVotes") {
    var label, url
    if (props.pollName) {
      label = props.err ? "Try Again": "Return to Poll"
    } else if (props.resultUrl) {
      label = "See Result"
      url = props.resultUrl
    } else if (props.err) {
      label = "OK"
      url = process.env.PRODUCTION_URL || "http://localhost:3000"
    }
    content = <PrimaryButton
                className={buttonStyles.btnPopup}
                label={label}
                onClick={(props.err || !props.resultUrl) ? props.onClick: ()=>{}}
              />
    if (url) {
      content = <a href={url}>{content}</a>
    }
  }
  return (
      <div className={styles.popup}>
        <div>
          <div className={styles.content}>
            {props.pollName ?'Welcome to' : 'Thank you for using'}
          </div>
          <div className={styles.logo}>LunchBox</div>
        </div>
        <hr/>
        <div>
          <div className={classnames(styles.content, styles.message)}>
            {props.message}
          </div>
          {content}
        </div>
      </div>
    );
}

MessagePopup.propTypes = {
  action: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  err: PropTypes.bool,
  pollName: PropTypes.string,
  pollUrl: PropTypes.string,
  resultUrl: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onCopy: PropTypes.func,
};

MessagePopup.defaultProps = {
  err: false,
  pollName: '',
  pollUrl: '',
  resultUrl: '',
};

export default MessagePopup
