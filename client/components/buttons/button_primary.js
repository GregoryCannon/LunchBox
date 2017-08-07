import React, { Component } from 'react';
import { PropTypes as ptypes } from 'prop-types'
import classnames from 'classnames'
import styles from './stylesheet.styl';
import { Button } from 'react-bootstrap';


const ButtonPrimary = (props) => {
  const btnClasses = classnames(props.className, styles.btnPrimary);
  return (
    <Button
      bsStyle="default"
      className={btnClasses}
      onClick={props.onClick}
    >
      <span>
        {props.label}
      </span>
    </Button>
  )
}

ButtonPrimary.propTypes = {
  className: ptypes.string,
  label: ptypes.string,
  onClick: ptypes.func
};

ButtonPrimary.defaultProps = {
  className: '',
  label: '',
  onClick: null
};

export default ButtonPrimary
