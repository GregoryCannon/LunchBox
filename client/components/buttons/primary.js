import React, { Component } from 'react';
import { PropTypes as ptypes } from 'prop-types'
import classnames from 'classnames'
import styles from './primary.styl';
import { Button } from 'react-bootstrap';


const ButtonPrimary = (props) => {
  var btnClasses = classnames(styles.btnPrimary, props.className, {[styles.noPadding]: props.url});
  if (props.imgSrc) { btnClasses = styles.imgBtn }

  const getContents = () => {
    if (props.url){
      return <a className={styles.buttonLink} href={props.url}>{props.label}</a>;
    } else if (props.imgSrc){
      return <img src={props.imgSrc}/>;
    } else {
      return <span>{props.label}</span>;
    }
  }

  return (
    <Button
      bsStyle="default"
      className={btnClasses}
      onClick={props.onClick}
      type="submit"
    >
      {getContents()}
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
