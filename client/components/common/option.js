import React, { Component } from 'react';
import classnames from 'classnames'
import styles from './option.styl';
import { Row, Col } from 'react-bootstrap';


class Option extends Component{

  constructor(props) {
    super(props);
    this.state = {
      selected: false,
    }
  }

  select = () => {
    this.setState({
      selected: !this.state.selected
    })
  }

  render() {
    const optionStyle = this.state.selected ? styles.selectedOption: styles.option
    const checkboxSrc = this.state.selected ? "checkbox-checked.svg": "checkbox-empty.svg"
    return (
      <Row className={optionStyle} onClick={this.select}>
        <Col md={1}>
          <img src={checkboxSrc }className={styles.checkBox}/>
        </Col>
        <Col md={2}>
          <img src={this.props.img} className={styles.optionImg}/>
        </Col>
        <Col md={7}>
          <div>
            <Row className={classnames(styles.title, styles.optionTitle)}>
              <Col md={4}>
                {this.props.restuarantName}
              </Col>
              <Col md={8} className={styles.optionRating}>
                <span className="glyphicon glyphicon-star filled"></span>
                <span className="glyphicon glyphicon-star filled"></span>
                <span className="glyphicon glyphicon-star filled"></span>
                <span className="glyphicon glyphicon-star filled"></span>
                <span className="glyphicon glyphicon-star"></span>
              </Col>
            </Row>
            <Row className={styles.optionCuisine}>
              {this.props.cuisine}
            </Row>
            <Row className={styles.optionInfo}>
              $$$
            </Row>
          </div>
        </Col>
        <Col md={2} className={styles.optionDistance}>
          {this.props.distance}
        </Col>
      </Row>
      )
  }

}

export default Option
