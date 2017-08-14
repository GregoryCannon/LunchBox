import React, { Component } from 'react';
import { PropTypes as ptypes } from 'prop-types'
import styles from './search.styl';
import { Button, Glyphicon } from 'react-bootstrap';


const ButtonSearch = (props) => {
  return (
    <Button
      bsStyle="default"
      className={styles.btnSearch}
      onClick={props.onClick}
      type="submit"
    >
      <Glyphicon glyph="search"/>
    </Button>
  )
}

ButtonSearch.propTypes = {
  onClick: ptypes.func
};

ButtonSearch.defaultProps = {
  onClick: null
};

export default ButtonSearch
