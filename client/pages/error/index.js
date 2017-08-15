import React from 'react';
import { Link } from 'react-router-dom';

import NavBar from '../../components/common/navbar'
import styles from './stylesheet.styl';

const Error = (props) => {
  return (
  	<div>
	  	<NavBar/>
	    <div className={styles.content}>
	      <div className={styles.title}>404 - Page Not Found</div>
	      <Link to="/">Return Home</Link>
	    </div>
    </div>
  );
};

export default Error;
