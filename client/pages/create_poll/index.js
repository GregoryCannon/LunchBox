import React, { Component } from 'react';
import classnames from 'classnames';
import { Grid, Row, Col } from 'react-bootstrap';
import io from 'socket.io-client';
import moment from 'moment'
const _ = require('lodash');
const socket = io();
import ReactLoading from 'react-loading';
import Pagination from 'react-js-pagination';

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
      popupShowing: true,
      creatorName: 'Food Guru',
      keyword: '',
      location: 'Westwood, Los Angeles',
      endTime: moment.duration(util.getStartTimeString()).asSeconds(),
      sortingMetric: 'best_match',
      options: {},
      selectedOptions: {},
      err: false,
      message: '',
      pollUrl: '',
      activePage: 1
    }
    this.updateOptions();
  }

  hidePopup = () => {
    this.setState({ popupShowing: false });
  }

  saveCreatorName = (e) => {
    this.setState({ creatorName: e.target.value });
  }

  updateEndTime = (endTime) => {
    this.setState({ endTime: endTime })
  }

  updateKeyword = (e) => {
    if (e.key === 'Enter') {
      this.setState({keyword: e.target.value}, this.updateOptions)
    } else {
      this.setState({keyword: e.target.value})
    }
  }

  updateLocation = (location, locationId) => {
    this.setState({location: location}, () => {
      if (locationId) this.updateOptions();
    })
  }

  updateSortBy = (e) => {
    this.setState({ sortingMetric: e.target.value }, this.updateOptions);
  }

  updateOptions = () => {
    util.getOptions(this.state.keyword, this.state.location, this.state.sortingMetric).then(
      options => {
        this.setState({
          options: options,
          activePage: 1
        })
      }
    );
  }

  handlePageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber });
  }

  toggleSelect = (e) => {
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
    socket.emit('createPoll', pollData)
    socket.on('_createPoll', (pollData) => {
      const pollUrl = (process.env.PRODUCTION_URL || "http://localhost:3000") + "/polls/" + pollData._id
       const resultUrl = (process.env.PRODUCTION_URL || "http://localhost:3000") + "/results/" + pollData._id
      this.setState({
        popupShowing: true,
        err: false,
        message: "Your poll is up at ",
        pollUrl: pollUrl,
        resultUrl: resultUrl
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

  render() {
    const options = util.getValues(this.state.options)
    const startIndex = (this.state.activePage - 1) * 5
    const endIndex = startIndex + 5
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
            search={this.updateOptions}
          />
          <Row className={styles.optionsContainer}>
            <Col md={8}>
              {options.length > 0 &&
                <div>
                  <div>{options.slice(startIndex, endIndex).map((option, i) => {
                      return <Option
                              key={i}
                              option={option}
                              onClick={this.toggleSelect}/>;
                      })}
                  </div>
                  <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={5}
                    totalItemsCount={options.length}
                    pageRangeDisplayed={3}
                    onChange={this.handlePageChange}
                  />
                </div>
              }
              {options.length == 0 &&
                <div className={styles.loadingContainer}>
                  <ReactLoading type={"spinningBubbles"} color={"#2e86ab"}/>
                </div>
              }
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
