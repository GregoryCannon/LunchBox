import React from 'react'
import styles from './stylesheet.styl';

class CreatePollPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		};
	}

  render() {
    return (
      <p className={styles.title}>Siga's Lunch Poll</p>
      )
  }
}

module.exports = CreatePollPage;
