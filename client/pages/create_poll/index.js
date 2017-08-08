import React from 'react'
import classnames from 'classnames'
import { Row, Col, FormGroup, FormControl, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap'

import styles from './stylesheet.styl';
import NavBar from '../../components/common/navbar'
import Option from '../../components/common/option'
import PrimaryButton from '../../components/buttons/button_primary'


const CreatePollPage = (props) => {
  return (
      <div>
        <NavBar/>
        <div className={classnames(styles.pollContainer, styles.content)}>
          <div className={styles.pollHeading}>
            {props.pollCreater}&rsquo;s Lunch Poll
          </div>
          <Row>
            <Col md={4}>
              <FormGroup>
                <ControlLabel>Location:</ControlLabel>
                <FormControl className={styles.input} type="location" name="location" placeholder="West Wood, CA"/>
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
          <PrimaryButton label="Create a Poll"/>
        </div>
      </div>
      )
}

module.exports = CreatePollPage;
