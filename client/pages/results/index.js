import React, {Component}  from 'react';
import classnames from 'classnames';
import io from 'socket.io-client';
import Countdown from 'react-count-down';

import styles from './stylesheet.styl';
import PaddedGrid from 'components/common/padded-grid';
import NavBar from 'components/common/navbar';
import Option from './option';
import Popup from 'components/common/popup';
import PrimaryButton from '../../components/buttons/primary';
import util from './util';
const socket = io();

class ResultsPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      poll: {},
      sortedOptions: [],
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

  renderOptions() {
    if (!this.state.sortedOptions || this.state.sortedOptions.length == 0) return

    var prevRank = 1;
    return [0,1,2].map((i) => {
      var rank;
      var options = this.state.sortedOptions;
      if (!options[i]) return
      const getScore = (j) => {
        return this.state.poll.scores[options[j].yelpId];
      }
      if (i == 0){
        rank = 1;
      } else if (getScore(i) == getScore(i-1)) {
        rank = prevRank;
      } else {
        rank = i+1;
      }
      prevRank = rank;
      return (
        <Option
          rank={rank}
          key={i}
          option={options[i]}
          poll={this.state.poll}
        />
      );
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
        <PaddedGrid>
          {this.state.poll.scores &&
          <div className={classnames(styles.pollContainer, styles.content)}>
            <div className={styles.pollHeading}>
              {this.state.poll.pollName}
            </div>
            <div className={styles.pollSubheading}>
              <div>Time Left: </div>
              <div><Countdown options={countDownOptions}/></div>
            </div>
            <div className={styles.optionsContainer}>
              {this.renderOptions()}
            </div>
          </div>}
        </PaddedGrid>
        <Popup
          showing={this.state.popupShowing}
          parentPage={"viewResults"}
          err={this.state.err}
          message={this.state.message}
        />
      </div>
      )
  }
}

export default ResultsPage
