import React from 'react'
import { PropTypes as ptypes } from 'prop-types'
import styles from './vote.styl';
import { Button } from 'react-bootstrap';


const ButtonVote = (props) => {
  var btnStyle, imgSrc
  switch (props.name) {
    case "up":
      btnStyle = props.isSelected ? styles.selectedUpBtn: styles.upBtn
      imgSrc = "thumb_up.png"
      break
    case "down":
      btnStyle = props.isSelected ? styles.selectedDownBtn: styles.downBtn
      imgSrc = "thumb_down.png"
      break
    case "veto":
      btnStyle = props.isSelected ? styles.selectedVetoBtn: styles.vetoBtn
      imgSrc = "veto.png"
      break
    default:
      break
  }
  return (
    <button
      className={btnStyle}
      onClick={props.onClick}
    >
      <img src={imgSrc} className={styles.voteImg}/>
      <div className={styles.numVotes}>
        {props.numVotes}
      </div>
    </button>
    )
}

ButtonVote.propTypes = {
  name: ptypes.string.isRequired,
  numVotes: ptypes.number,
  onClick: ptypes.func.isRequired
};

ButtonVote.defaultProps = {
  name: 'up',
  numVotes: 0,
  onClick: null
};

export default ButtonVote
