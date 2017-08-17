import React from 'react';
import { Grid } from 'react-bootstrap';
import classnames from 'classnames';

import styles from './stylesheet.styl';

const PaddedGrid = (props) => (
  <Grid className={classnames(styles.gridPadding, props.className)}>
    {props.children}
  </Grid>
)

export default PaddedGrid;
