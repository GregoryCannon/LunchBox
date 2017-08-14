import React, {Component}  from 'react'
import classnames from 'classnames'
import { Grid } from 'react-bootstrap'

import styles from './stylesheet.styl';
import NavBar from '../../components/common/navbar'
import Option from './option'
import PrimaryButton from '../../components/buttons/primary'

class TakePollPage extends Component{

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <NavBar/>
        <Grid>
          <div className={classnames(styles.pollContainer, styles.content)}>
            <div className={styles.pollHeading}>
              {this.props.pollCreater}&rsquo;s Lunch Poll
            </div>
            <div className={styles.pollSubheading}>
              Time Left: {this.state.remainingTime}
            </div>
            <div className={styles.optionsContainer}>
              <Option img="https://s3-media1.fl.yelpcdn.com/bphoto/VO8a4bqyYsH4dCXBSChLLA/348s.jpg" restuarantName="Tender Greens" distance="0.6 mi" cuisine="Ramen" rating="4"/>
            </div>
            <PrimaryButton label="Submit"/>
          </div>
        </Grid>
      </div>
      )
  }
}

export default TakePollPage
