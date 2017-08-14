import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames'
import styles from './option.styl';
import { Row, Col } from 'react-bootstrap';
var _ = require('lodash');
import VoteButton from '../../components/buttons/vote'

class Option extends Component{

  constructor(props) {
    super(props);
    this.state = {
      selectedBtn: '',
    }
  }

  Rating = (props) => {
    return (
      <span className={styles.optionRating}>
        {_.range(5).map((i) =>
          <span key={i} className={(i >= props.rating) && styles.emptyStar}>&#9733;</span>)}
      </span>
      )
  }

  up = () => {
    this.setState({ selectedBtn: 'up' });
  }

  down = () => {
    this.setState({ selectedBtn: 'down' });
  }

  veto = () => {
    this.setState({ selectedBtn: 'veto' });
  }

  render() {
    const optionStyle = this.state.selected ? styles.selectedOption: styles.option
    return (
      <div className={optionStyle}>
        <img src={this.props.img} className={styles.optionImg}/>
        <div className={styles.infoContainer}>
          <div className={styles.optionTitle}>
            {this.props.restuarantName}
          </div>
          <div className={styles.optionCuisine}>
            {this.props.cuisine}
          </div>
          <div className={styles.optionInfo}>
            <span>{this.props.distance},</span>
            <span>$$$,</span>
            <this.Rating rating={this.props.rating}/>
          </div>
        </div>
        <div>
          <VoteButton
            name="veto"
            isSelected={this.state.selectedBtn=='veto'}
            numVotes={this.props.numVetos}
            onClick={this.veto}
          />
          <VoteButton
            name="down"
            isSelected={this.state.selectedBtn=='down'}
            numVotes={this.props.numDowns}
            onClick={this.down}
          />
          <VoteButton
            name="up"
            isSelected={this.state.selectedBtn=='up'}
            numVotes={this.props.numUps}
            onClick={this.up}
          />
        </div>
      </div>
      )
  }
}

Option.propTypes = {
  img: PropTypes.string.isRequired,
  restaurantName: PropTypes.string.isRequired,
  cuisine: Proptypes.string.isRequired,
  distance: Proptypes.string.isRequired,
  numVetos: Proptypes.number.isRequired,
  numDowns: Proptypes.number.isRequired,
  numUps: Proptypes.number.isRequired
}

export default Option
