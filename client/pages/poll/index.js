import React, {Component}  from 'react'
import classnames from 'classnames'
import { Grid } from 'react-bootstrap'
import io from 'socket.io-client';
import Countdown from 'react-count-down'

import styles from './stylesheet.styl';
import NavBar from '../../components/common/navbar'
import Option from './option'
import Popup from 'components/common/popup';
import PrimaryButton from '../../components/buttons/primary'
import util from './util'
const socket = io();

class TakePollPage extends Component{

  constructor(props) {
    super(props);
    this.state = {
      popupShowing: true,
      err: false,
      message: '',
      username: '',
      returning: false,
      poll: {},
      resultUrl: '',
      votes: {}
    }
  }

  hidePopup = () => {
    this.setState({
      popupShowing: false
    });
  }

  saveUsername = (e) => {
    this.setState({
      username: e.target.value
    });
  }

  confirmReturn = () => {
    this.setState({
      popupShowing: false,
      returning: true,
      votes: this.state.poll.voters[this.state.username]
    })
  }

  checkUsername = () => {
    if (this.state.username.length == 0) {
        this.setState({
          popupShowing: true,
          alertMessage: "Please enter your name above."
        });
    } else if (this.state.username in (this.state.poll.voters || {}) && !this.state.returning) {
        this.setState({
          popupShowing: true,
          alertMessage: "Someone has already joined with that name. Please enter a different name."
        });
    } else {
      this.hidePopup()
    }
  }

  vote = (e) => {
    e.preventDefault()
    this.state.votes[e.currentTarget.dataset.yelpId] = e.currentTarget.name
    this.submitVotes()
  }

  submitVotes = () => {
    var voteData = {
      voterName: this.state.username,
      votes: this.state.votes
    }
    socket.emit('submitVotes', this.props.match.params.id, voteData)
  }

  confirmVotes = () => {
    this.setState({
      popupShowing: true,
      err: false,
      message: "Your votes have been submitted!"
    });
  }

  updatePoll = (pollData) => {
    if (pollData.open) {
     this.setState({
        poll: pollData,
        votes: pollData.voters[this.state.username] || {}
      })
    } else {
      this.setState({
        resultUrl: process.env.PRODUCTION_URL || "http://localhost:3000" + "/results/" + pollData._id,
        message: "Sorry, the poll is closed."
      });
    }
  }

  componentWillMount() {
    socket.on('connect', () => {
      socket.emit('getPoll', this.props.match.params.id)
      socket.emit('joinRoom', this.props.match.params.id)
    })
    socket.emit('getPoll', this.props.match.params.id)
    socket.on('_getPoll', (pollData) => {
      this.updatePoll(pollData)
    })
    socket.on('_getPollError', (err) => {
      this.setState({
        popupShowing: true,
        err: true,
        message: "Oops, could not find the poll. Please make sure that link is valid."
      });
    })
    socket.on('_submitVotes', (pollData) => {
      this.setState({
        poll: pollData
      });
    })
    socket.on('_submitVotesError', (pollData) => {
      this.setState({
        popupShowing: true,
        message: "Oops, an error has occurred. Please try again."
      });
    })
  }

  render() {
    const callback = () => {};
    const countDownOptions = {
      endDate: this.state.poll.endTime,
      prefix: '',
      callback
    }
    return (
      <div>
        <NavBar/>
        <div className={classnames(styles.pollContainer, styles.content)}>
          <div className={styles.pollHeading}>
            {this.state.poll.pollName}
          </div>
          <div className={styles.pollSubheading}>
            <div>Time Left: </div>
            <div><Countdown options={countDownOptions}/></div>
          </div>
          <div className={styles.optionsContainer}>
            {Object.keys(this.state.poll).length > 0 && util.getValues(this.state.poll.options).map((option, i) => {
              return <Option
                      key={i}
                      option={option}
                      poll={this.state.poll}
                      username={this.state.username}
                      selectedBtn={this.state.votes[option.yelpId]}
                      onClick={this.vote}
                    />;
            })}
          </div>
          <PrimaryButton
            label="Submit"
            onClick={this.confirmVotes}
          />
        </div>
        {this.state.popupShowing &&
          <div className={styles.popupOverlay}>
          <Popup
              action={"submitVotes"}
              err={this.state.err}
              message={this.state.message}
              alertMessage={this.state.alertMessage}
              username={this.state.username}
              pollName={this.state.poll.pollName}
              resultUrl={this.state.resultUrl}
              hidePopup={this.hidePopup}
              onClick={this.checkUsername}
              onConfirmReturn={this.confirmReturn}
              handleClickOutside={this.hidePopup}
              onChange={this.saveUsername}/>
          </div>
        }
      </div>
      )
  }
}

export default TakePollPage
