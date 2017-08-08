import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Row, Col, FormGroup, FormControl, ControlLabel, DropdownButton, MenuItem }
  from 'react-bootstrap';

import styles from './stylesheet.styl';
import NavBar from 'components/common/navbar';
import Option from 'components/common/option';
import Popup from 'components/common/popup';
import PrimaryButton from 'components/buttons/button_primary';

import io from 'socket.io-client';
const socket = io();

export class CreatePollPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      popupShowing: 'true',
      creatorName: 'Lunchbox User',
      status: 'disconnected',
      id: ''
    }
  }

  componentWillMount() {
    socket.on('connect', this.connect);
    socket.on('disconnect', this.disconnect);
    socket.on('idResponse', this.hearIdResponse);
    socket.on('message', this.hearMessage);
  }

  connect = () => {
    this.setState({ status: 'connected' });
    socket.emit('requestId');
    socket.emit('joinRoom', 77);
  }

  disconnect = () => {
    this.setState({ status: 'disconnected'})
  }

  hearIdResponse = (newId) => {
    this.setState({ id: newId });
  }

  hearMessage = (message) => {
    console.log('Recieved message: ' + message);
  }

  hidePopup = () => {
    this.setState({
      popupShowing: false,
      creatorName: 'WeDontHaveChangeListeners'
    });
  }

  render() {
    return (
      <div>
        <NavBar/>

        <div className={classnames(styles.pollContainer, styles.content)}>
          <div className={styles.pollHeading}>
            {this.props.pollCreator}&rsquo;s Lunch Poll
          </div>
          <Row>
            <Col md={4}>
              <FormGroup>
                <ControlLabel>Location:</ControlLabel>
                <FormControl className={styles.input} type="location" name="location" placeholder="Westwood, CA"/>
              </FormGroup>
            </Col>

            <Col md={4}>
              <FormGroup>
                <ControlLabel>Poll Length:</ControlLabel>
                <FormControl componentClass="select" className={styles.input}>
                  <option value="10" default>10 minutes</option>
                  <option value="20">20 minutes</option>
                  <option value="30">30 minutes</option>
                </FormControl>
              </FormGroup>
            </Col>

            <Col md={4}>
              <FormGroup>
                <ControlLabel>Sort By:</ControlLabel>
                <FormControl className={styles.input} componentClass="select">
                  <option value="rating" default>Highest Rating</option>
                  <option value="price">Highest Price</option>
                  <option value="new">Hot & New</option>
                </FormControl>
              </FormGroup>
            </Col>
          </Row>
          <div className={styles.optionsContainer}>
            <Option img="https://s3-media1.fl.yelpcdn.com/bphoto/VO8a4bqyYsH4dCXBSChLLA/348s.jpg" restuarantName="Tender Greens" distance="0.6 mi" cuisine="Ramen" rating="4"/>
          </div>
          <PrimaryButton label="Create Poll"/>
        </div>

        {this.state.popupShowing &&
          <div className={styles.popupOverlay}>
            <Popup onClick={this.hidePopup} />
          </div>
        }
      </div>
    )
  }
}

CreatePollPage.propTypes = {
  popup: PropTypes.bool,
  pollCreator: PropTypes.string
};

CreatePollPage.defaultProps = {
  popup: false,
  pollCreator: 'Lunchbox User'
};

export default CreatePollPage;
