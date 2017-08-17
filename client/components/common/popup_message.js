import React, { Component } from 'react'
import classnames from 'classnames'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import CopyToClipboard from 'react-copy-to-clipboard';

import styles from './popup.styl'
import buttonStyles from '../buttons/primary.styl'
import PrimaryButton from '../buttons/primary'

const MessagePopup = (props) => {
  console.log(props);
  const getContent = () => {
    var label, url, clickable;
    if (props.parentPage === 'createPoll') {
      clickable = true;
      if (props.err){
        label = 'Try Again';
      } else {
        url = props.pollUrl;
        label = 'Take Poll';
      }
    } else if (props.parentPage === 'takePoll'){
      clickable = props.err || !props.resultUrl;
      if (props.resultUrl) {
        label = "View Results"
        url = props.resultUrl
      } else if (props.pollName) {
        label = props.err ? "Try Again" : "View Results"
      } else if (props.err) {
        label = "OK"
        url = `${window.location.protocol}//${window.location.host}`
      }
    } else {
      label = 'Unknown state';
      clickable = false;
    }

    return (
      <PrimaryButton
        className={buttonStyles.btnPopup}
        label={label}
        onClick={clickable ? props.onClick : ()=>{}}
        url={url}
      />
    )
  }

  return (
    <div className={styles.popupMessage}>
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
          {props.pollUrl &&
            <div>
                <a href={props.pollUrl} target="_blank">{props.pollUrl}</a>
                <CopyToClipboard
                  text={props.pollUrl}
                  onCopy={()=>{}}>
                    <img
                      className={classnames(styles.imgBtn, styles.copyButton)}
                      src="/copy.svg"
                    />
                </CopyToClipboard>
            </div>
          }
        </div>
        {getContent()}
      </div>
    </div>
  );
}

MessagePopup.propTypes = {
  parentPage: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  err: PropTypes.bool,
  pollName: PropTypes.string,
  pollUrl: PropTypes.string,
  resultUrl: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

MessagePopup.defaultProps = {
  err: false,
  pollName: '',
  pollUrl: '',
  resultUrl: '',
};

export default MessagePopup
