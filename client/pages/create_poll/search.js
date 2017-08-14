import React from 'react';
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {Row, Col, FormGroup, FormControl, ControlLabel, InputGroup } from 'react-bootstrap';
import PlacesAutocomplete from '../../assets/react-places-autocomplete'
import TimePicker from 'react-bootstrap-time-picker'

import styles from './stylesheet.styl';
import SearchButton from '../../components/buttons/search'
import util from './util'

const Search = (props) => {
  const autocompleteProps = {
    value: props.location,
    onChange: props.updateLocation,
  }

  return (
    <div className={styles.searchContainer}>
      <div>
        <FormGroup>
          <InputGroup className={styles.input} >
            <FormControl onKeyDown={props.updateKeyword} placeholder="Tender Greens">
            </FormControl>
            <InputGroup.Addon className={styles.addon}>
              <SearchButton onClick={props.search}/>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
      </div>

      <Row>
        <Col md={4}>
          <FormGroup>
            <ControlLabel>Location:</ControlLabel>
            <div className={styles.input}>
              <PlacesAutocomplete
                classNames={
                  {input: 'stylesheet__input__1Ond_ form-control'}
                }
                inputProps={autocompleteProps}
                onSelect={props.updateLocation}/>
            </div>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <ControlLabel>End Time:</ControlLabel>
            <div className={styles.input}>
              <TimePicker
                value={props.endTime}
                start={util.getStartTimeString()}
                end={util.getEndTimeString()}
                step={15}
                onChange={props.updateEndTime} />
            </div>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <ControlLabel>Sort By:</ControlLabel>
            <FormControl className={styles.input} componentClass="select" onChange={props.updateSortBy}>
              <option value="best_match">Recommended</option>
              <option value="rating">Highest Rating</option>
              <option value="distance">Distance</option>
            </FormControl>
          </FormGroup>
        </Col>
      </Row>
  </div>
    )
}

Search.propTypes = {
  location: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  updateKeyword: PropTypes.func.isRequired,
  updateLocation: PropTypes.func.isRequired,
  updateEndTime: PropTypes.func.isRequired,
  updateSortBy: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired
};

export default Search
