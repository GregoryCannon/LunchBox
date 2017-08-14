import React from 'react';
import styles from './option.styl';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
var _ = require('lodash');


const Option = (props) => {

  const optionStyle = props.option.selected ? styles.selectedOption: styles.option
  const checkboxSrc = props.option.selected ? "checkbox-checked.svg": "checkbox-empty.svg"
  return (
    <div
      data-yelp-id={props.option.yelpId}
      className={optionStyle}
      onClick={props.onClick}
    >
      <img src={checkboxSrc} className={styles.checkBox}/>
      <img
        src={props.option.imgUrl}
        className={styles.optionImg}
      />
      <div className={styles.infoContainer}>
        <Row>
          <Col md={9} className={styles.optionTitle}>
            <a href={props.option.yelpUrl}>{props.option.name}</a>
          </Col>
          <Col md={3} className={styles.optionRating}>
            <Rating rating={props.option.rating}/>
          </Col>
        </Row>
        <Row className={styles.optionCuisine}>
          {props.option.categories}
        </Row>
        <Row className={styles.optionInfo}>
          {props.option.price}
        </Row>
      </div>
      <div className={styles.optionDistance}>
        {props.option.distance}
      </div>

    </div>
  )

}

const Rating = (props) => {
  return (
    <div>
      {_.range(5).map((i) =>
        <span key={i} className={(i >= props.rating) && styles.emptyStar}>&#9733;</span>)}
    </div>
    )
}

Option.propTypes = {
  onClick: PropTypes.func.isRequired,
  option: PropTypes.object.isRequired
};

export default Option
