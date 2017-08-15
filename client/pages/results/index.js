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

class ResultsPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      poll: {},
      sortedOption: [],
    }
  }

  updateResults = (pollData) => {
    var options = util.getValues(pollData.options)
    options.sort((optionA, optionB) => { return pollData.scores[optionB.yelpId] - pollData.scores[optionA.yelpId]})
    this.setState({
      poll: pollData,
      sortedOptions: options.slice(0, 3)
    })
  }

  componentWillMount() {
    socket.on('connect', () => {
      socket.emit('getPoll', this.props.match.params.id)
      socket.emit('joinRoom', this.props.match.params.id)
    })
    socket.emit('getPoll', this.props.match.params.id)
    socket.on('_getPoll', (pollData) => {
      this.updateResults(pollData)
    })
    socket.on('_getPollError', (err) => {
      this.setState({
        popupShowing: true,
        err: true,
        message: "Oops, could not find the poll. Please make sure that link is valid."
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
        <Grid>
          <div className={classnames(styles.pollContainer, styles.content)}>
            <div className={styles.pollHeading}>
              {this.state.poll.pollName}
            </div>
            <div className={styles.pollSubheading}>
              <div>Time Left: </div>
              <div><Countdown options={countDownOptions}/></div>
            </div>
            <div className={styles.optionsContainer}>
              {this.state.sortedOptions && this.state.sortedOptions.map((option, i) => (
                <Option
                  rank={i+1}
                  key={i}
                  option={option}
                  poll={this.state.poll}
                />
              ))}
            </div>
          </div>
        </Grid>
      </div>
      )
  }
}

export default ResultsPage
