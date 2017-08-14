import React, { Component } from 'react';
import classnames from 'classnames'
import { Row, Col } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip'
var _ = require('lodash');

import styles from './option.styl';
import VoteButton from '../../components/buttons/vote'


const Option = (props) => {

  const voteTotals = (props.poll.voteTotals || {})[props.option.yelpId] || {
    up: [],
    down: [],
    veto: []
  }
  return (
    <div
      className={styles.option}
      id={props.option.yelpId}
      key={props.option.yelpId}
    >
      <img src={props.option.imgUrl} className={styles.optionImg}/>
      <div className={styles.infoContainer}>
        <Row className={styles.optionTitle}>
          <a href={props.option.yelpUrl}>{props.option.name}</a>
        </Row>
        <Row className={styles.optionCuisine}>
          {props.option.categories}
        </Row>
        <Row className={styles.optionInfo}>
          <span>{props.option.distance},</span>
          <span>{props.option.price},</span>
          <Rating rating={props.option.rating}/>
        </Row>
      </div>
      <div>
        <VoteButton
          name="veto"
          yelpId={props.option.yelpId}
          username={props.username}
          isSelected={props.selectedBtn=='veto'}
          voters={voteTotals.veto}
          onClick={props.onClick}
        />
        <VoteButton
          name="down"
          yelpId={props.option.yelpId}
          username={props.username}
          isSelected={props.selectedBtn=='down'}
          voters={voteTotals.down}
          onClick={props.onClick}
        />
        <VoteButton
          name="up"
          yelpId={props.option.yelpId}
          username={props.username}
          isSelected={props.selectedBtn=='up'}
          voters={voteTotals.up}
          onClick={props.onClick}
        />
      </div>
    </div>
    )
}

const Rating = (props) => {
  return (
    <span className={styles.optionRating}>
      {_.range(5).map((i) =>
        <span key={i} className={(i >= props.rating) && styles.emptyStar}>&#9733;</span>)}
    </span>
    )
  }

export default Option
