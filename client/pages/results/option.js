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
  var option
  if (props.rank == 1) {
    option = <div
              className={styles.topOption}
              id={props.option.yelpId}
              key={props.option.yelpId}
            >
              <div className={styles.ranking}>
                <div href={props.option.yelpUrl}>#{props.rank}</div>
                <img src={props.option.imgUrl} className={styles.optionImg}/>
              </div>
              <div className={styles.infoContainer}>
                <div className={styles.info}>
                  <Row className={styles.optionTitle}><a href={props.option.yelpUrl}>{props.option.name}</a></Row>
                  <Row className={styles.optionCuisine}>
                    {props.option.categories}
                  </Row>
                  <Row>
                    <span>{props.option.distance},</span>
                  </Row>
                  <Row>
                    <span>{props.option.price},</span>
                  </Row>
                  <Row>
                    <Rating rating={props.option.rating}/>
                  </Row>
                </div>
                <div className={styles.votes}>
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
            </div>
  } else {
    option = <div
                className={styles.otherOption}
                id={props.option.yelpId}
                key={props.option.yelpId}
              >
              <div className={styles.info}>
                <span className={styles.ranking}>
                  #{props.rank}
                </span>
                <span className={styles.optionTitle}>
                  <a href={props.option.yelpUrl}>
                    {props.option.name}
                  </a>
                </span>
                <span className={styles.optionCuisine}>
                  {props.option.categories}
                </span>
              </div>
              <div className={styles.votes}>
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
  }
  return (
          <div>
            {option}
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
