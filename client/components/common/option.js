import React, { Component } from 'react';
import classnames from 'classnames'
import styles from './option.styl';
import { Row, Col } from 'react-bootstrap';
var _ = require('lodash')


class Option extends Component{

  constructor(props) {
    super(props);
    this.state = {
      selected: false,
    }
  }

  select = () => {
    this.setState({
      selected: !this.state.selected
    })
  }

  Rating = (props) => {
    return (
      <div>
        {_.range(5).map((i) =>
          <span key={i} className={(i >= props.rating) && styles.emptyStar}>&#9733;</span>)}
      </div>
    )
  }

  render() {
    const optionStyle = this.state.selected ? styles.selectedOption: styles.option
    const checkboxSrc = this.state.selected ? "checkbox-checked.svg": "checkbox-empty.svg"
    return (
      <div className={optionStyle} onClick={this.select}>
        <img src={checkboxSrc} className={styles.checkBox}/>
        <img src={this.props.img} className={styles.optionImg}/>
        <div className={styles.infoContainer}>
          <Row className={styles.optionTitle}>
            <Col md={7}>
              {this.props.restuarantName}
            </Col>
            <Col md={5} className={styles.optionRating}>
              <this.Rating rating={this.props.rating}/>
            </Col>
          </Row>
          <Row className={styles.optionCuisine}>
            {this.props.cuisine}
          </Row>
          <Row className={styles.optionInfo}>
            $$$
          </Row>
        </div>
        <div className={styles.optionDistance}>
          {this.props.distance}
        </div>
      </div>
      )
  }

}

export default Option
