import React from 'react'
import { PropTypes as ptypes } from 'prop-types'
import styles from './vote.styl';
import { Button } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';


const ButtonVote = (props) => {
  var btnStyle, imgSrc
  switch (props.name) {
    case "up":
      btnStyle = props.isSelected || !props.onClick ? styles.selectedUpBtn : styles.upBtn
      imgSrc = "/thumb_up.png"
      break
    case "down":
      btnStyle = props.isSelected || !props.onClick ? styles.selectedDownBtn : styles.downBtn
      imgSrc = "/thumb_down.png"
      break
    default:
      break
  }
  const tooltipId = props.yelpId + '-' + props.name + '-voters'
  return (
    <button
      data-tip data-for={tooltipId}
      className={btnStyle}
      name={props.name}
      data-yelp-id={props.yelpId}
      onClick={props.onClick}
    >
      {props.voters.length > 0 &&
        <ReactTooltip
          id={tooltipId}
          place="top"
          type="dark"
          effect="solid"
          className={styles.tooltip}
        >
          {props.voters.map((voter, i) => (
            <div key={i}>
              {voter == props.username? "You": voter}
            </div>
          ))}
        </ReactTooltip>
      }
      <img src={imgSrc} className={styles.voteImg}/>
      <div className={styles.numVotes}>
        {props.voters.length}
      </div>
    </button>
    )
}

ButtonVote.propTypes = {
  name: ptypes.string.isRequired,
  voters: ptypes.array,
  onClick: ptypes.func
};

ButtonVote.defaultProps = {
  name: 'up',
  voters: [],
  onClick: null
};

export default ButtonVote
