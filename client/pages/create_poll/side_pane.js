import React from 'react';
import PropTypes from 'prop-types';
import { Row} from 'react-bootstrap';

import styles from './side_pane.styl';
import util from './util';

const SidePane = (props) => {
  return (
    <div
      className={styles.sidePaneContainer}
    >
      <div>Your Poll</div>
      <div className={styles.optionsContainer}>
        {Object.keys(props.selectedOptions).length > 0  ? (util.getValues(props.selectedOptions).map((option, i) => {
          return (
            <Row
              key={i}
              className={styles.option}
            >
              <div className={styles.optionName}>
                <span>&#8226;</span>
                <span>{option.name}</span>
              </div>
              <img
                src={'/cross.png'}
                className={styles.removeIcon}
                data-yelp-id={option.yelpId}
                onClick={props.onClick}
              />
            </Row>
            )
          })
        ) : (
          <div className={styles.message} >
            Please add options to your poll!
          </div>
        )
      }
      </div>
    </div>
    )
}

SidePane.propTypes = {
  selectedOptions: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default SidePane
