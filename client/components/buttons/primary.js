import React, { Component } from 'react';
import { PropTypes as ptypes } from 'prop-types'
import classnames from 'classnames'
import styles from './primary.styl';
import { Button } from 'react-bootstrap';


const ButtonPrimary = (props) => {
  var btnClasses = classnames(styles.btnPrimary, props.className);
  if (props.imgSrc) {
    btnClasses = styles.imgBtn
  }
  return (
    <Button
      bsStyle="default"
      className={btnClasses}
      onClick={props.onClick}
      type="submit"
    >
      {!props.imgSrc && <span>{props.label}</span>}
      {props.imgSrc && <img src={props.imgSrc}/>}
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
