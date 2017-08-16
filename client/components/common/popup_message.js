import React, { Component } from 'react'
import classnames from 'classnames'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import CopyToClipboard from 'react-copy-to-clipboard';

import styles from './popup.styl'
import buttonStyles from '../buttons/primary.styl'
import PrimaryButton from '../buttons/primary'

class MessagePopup extends Component {

  constructor(props) {
    super(props)
    this.state = {
      content: ""
    }
  }

  componentWillMount() {
    var content
    if (this.props.action === "createPoll") {
      content = !this.props.err ?
                  <a href={this.props.pollUrl}>
                    <PrimaryButton
                      className={buttonStyles.btnPopup}
                      label={"Take Poll"}
                      onClick={this.props.onClick}
                    />
                  </a>
                :
                  <PrimaryButton
                    className={buttonStyles.btnPopup}
                    label={"Try Again"}
                    onClick={this.props.onClick}
                  />

    } else if (this.props.action === "submitVotes") {
      var label, url
      if (this.props.resultUrl) {
        label = "View Results"
        url = this.props.resultUrl
      } else if (this.props.pollName) {
        label = this.props.err ? "Try Again": "View Results"
      } else if (this.props.err) {
        label = "OK"
        url = `${window.location.protocol}//${window.location.host}`
      }
      content = <PrimaryButton
                  className={buttonStyles.btnPopup}
                  label={label}
                  onClick={(this.props.err || !this.props.resultUrl) ? this.props.onClick: ()=>{}}
                />
      if (url) {
        content = <a href={url}>{content}</a>
      }
    }
    this.setState({ content: content })
  }

  render() {
    return (
        <div className={styles.popup}>
          <div>
            <div className={styles.content}>
              {this.props.pollName ?'Welcome to' : 'Thank you for using'}
            </div>
            <div className={styles.logo}>LunchBox</div>
          </div>
          <hr/>
          <div>
            <div className={classnames(styles.content, styles.message)}>
              {this.props.message}
              {this.props.pollUrl &&
                <div>
                    <a href={this.props.pollUrl} target="_blank">{this.props.pollUrl}</a>
                    <CopyToClipboard
                      text={this.props.pollUrl}
                      onCopy={()=>{}}>
                        <img className={styles.imgBtn} src="/copy.svg"/>
                    </CopyToClipboard>
                </div>
              }
            </div>
            {this.state.content}
          </div>
        </div>
      );
  }
}

MessagePopup.propTypes = {
  action: PropTypes.string.isRequired,
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
