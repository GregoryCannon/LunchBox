import React, { Component } from 'react';
import classnames from 'classnames';
import { Grid, Row, Col } from 'react-bootstrap';
import io from 'socket.io-client';
import moment from 'moment'
const _ = require('lodash');
const socket = io();

import styles from './stylesheet.styl';
import NavBar from '../../components/common/navbar'
import Search from './search'
import Option from './option'
import SidePane from './side_pane'
import Popup from 'components/common/popup';
import PrimaryButton from '../../components/buttons/primary'
import util from './util'

export class CreatePollPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      popupShowing: 'false',
      creatorName: 'Food Guru',
      keyword: '',
      location: 'Westwood, Los Angeles',
      endTime: moment.duration(util.getStartTimeString()).asSeconds(),
      sortingMetric: 'best_match',
      options: {},
      selectedOptions: {},
      err: false,
      message: '',
      pollUrl: ''
    }
  }

  hidePopup = () => {
    this.setState({
      popupShowing: false,
      options: this.state.pollUrl ? {} : this.state.options,
      selectedOptions: this.state.pollUrl ? {} : this.state.selectedOptions
    });
  }

  saveCreatorName = (e) => {
    this.setState({
      creatorName: e.target.value
    });
    if (e.key === 'Enter') {
      hidePopup()
    }
  }

  updateKeyword = (e) => {
    if (e.key === 'Enter') {
      this.updateOptions(this.state.location, this.state.sortingMetric, e.target.value)
    } else {
      this.setState({keyword: e.target.value})
    }
  }

  updateLocation = (location, locationId) => {
    if (!locationId) {
      this.setState({location: location})
    } else {
      this.updateOptions(location, this.state.sortingMetric, this.state.keyword)
    }
  }

  updateEndTime = (endTime) => {
    this.setState({endTime: endTime})
  }

  updateSortBy = (e) => {
    this.updateOptions(this.state.location, e.target.value, this.state.keyword)
  }

  search = () => {
    this.updateOptions(this.state.location, this.state.sortingMetric, this.state.keyword)
  }

  updateOptions = (location, sortingMetric, keyword) => {
    util.getOptions(keyword, location, sortingMetric).then(options => {
      this.setState({
        options: options,
        location: location,
        sortingMetric: sortingMetric,
        keyword: keyword
      })
    });
  }

  toggleSelect = (e) => {
    e.preventDefault()
    const yelpId = e.currentTarget.dataset.yelpId
    this.state.options[yelpId].selected = !this.state.options[yelpId].selected
    if (this.state.options[yelpId].selected) {
      this.state.selectedOptions[yelpId] = this.state.options[yelpId]
    } else if (yelpId in this.state.selectedOptions) {
      delete this.state.selectedOptions[yelpId]
    }
    this.setState({
      options: this.state.options,
      selectedOptions: this.state.selectedOptions
    })
  }

  createPoll = () => {
    if (Object.keys(this.state.selectedOptions).length == 0) {
      this.setState({
        popupShowing: true,
        err: true,
        message: "Please add options to your poll!",
      });
      return
    }
    const pollData = {
      pollName: `${this.state.creatorName}'s Lunch Poll`,
      options: util.getValues(this.state.selectedOptions),
      endTime: util.getTime(this.state.endTime)
    }
    console.log('endTime', pollData.endTime)
    socket.emit('createPoll', pollData)
    socket.on('_createPoll', (pollData) => {
      const pollUrl = process.env.PRODUCTION_URL || "localhost:3000/polls/" + pollData._id
      this.setState({
        popupShowing: true,
        err: false,
        message: "Your poll is up at " + pollUrl,
        pollUrl: pollUrl
      });
    })
    socket.on('_createPollError', (err) => {
      this.setState({
        popupShowing: true,
        err: true,
        message: "Oops, an error has occurred. Please try again",
      });
    })
  }

  componentWillMount() {
    this.updateOptions(this.state.location, this.state.sortingMetric)
  }

  render() {
    return (
      <div>
        <NavBar/>
        <Grid className={classnames(styles.pollContainer, styles.content)}>
          <div className={styles.pollHeading}>
            {this.state.creatorName}&rsquo;s Lunch Poll
          </div>
          <Search
            location={this.state.location}
            endTime={this.state.endTime}
            updateKeyword={this.updateKeyword}
            updateLocation={this.updateLocation}
            updateEndTime={this.updateEndTime}
            updateSortBy={this.updateSortBy}
            search={this.search}
          />
          <Row className={styles.optionsContainer}>
            <Col md={8}>
              {util.getValues(this.state.options).map((option, i) => {
                return <Option
                        key={i}
                        option={option}
                        onClick={this.toggleSelect}/>;
              })}
            </Col>
            <Col md={4}>
              <SidePane
                selectedOptions={this.state.selectedOptions}
                onClick={this.toggleSelect}
              />
            </Col>
          </Row>
          <PrimaryButton label="Create Poll" onClick={this.createPoll}/>
        </Grid>

        {this.state.popupShowing &&
          <div className={styles.popupOverlay}>
            <Popup
              action={"createPoll"}
              err={this.state.err}
              message={this.state.message}
              pollUrl={this.state.pollUrl}
              hidePopup={this.hidePopup}
              handleClickOutside={this.hidePopup}
              onChange={this.saveCreatorName}/>
          </div>
        }
      </div>
    )
  }
}

export default CreatePollPage;
