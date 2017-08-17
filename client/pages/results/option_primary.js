import React, { Component } from 'react';
import classnames from 'classnames'
import { Row, Col } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip'
var _ = require('lodash');

import styles from './option.styl';
import VoteButton from '../../components/buttons/vote'

const Rating = (props) => {
  return (
    <span className={styles.optionRating}>
      {_.range(5).map((i) =>
        <span key={i} className={(i >= props.rating) && styles.emptyStar}>&#9733;</span>)}
    </span>
    )
  }

const OptionPrimary = (props) => {
  const voteTotals = (props.poll.voteTotals || {})[props.option.yelpId] || {
    up: [],
    down: []
  }

  return (
    <div className={styles.topOption} key={props.option.yelpId}>
      <div className={styles.ranking}>#{props.rank}</div>
      <img className={styles.optionImg} src={props.option.imgUrl} />
      <div className={styles.infoContainer}>
        <div className={styles.optionTitle}>
          <a href={props.option.yelpUrl} target="_blank">{props.option.name}</a>
        </div>
        <div className={styles.info}>
          <div className={styles.optionCuisine}>
            {props.option.categories}
          </div>
          <div>{props.option.distance}</div>
          <div>{props.option.price}</div>
          <div><Rating rating={props.option.rating}/></div>
        </div>
        <div className={styles.votes}>
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
    </div>
  )
}

export default OptionPrimary
