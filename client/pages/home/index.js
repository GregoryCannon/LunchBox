import React, { Component } from 'react';
import styles from './stylesheet.styl';
import Popup from '../../components/common/popup'


export class Homepage extends Component {
	constructor() {
		this.state.id
	}

	componentWillMount() {
    socket.on('connect', this.connect);
    socket.on('disconnect', this.disconnect);
    socket.on('idResponse', this.hearIdResponse)
  }


	connect = () => {
    this.setState({ status: 'connected' });
    socket.emit('requestId');
  }

  disconnect = () => {
    this.setState({ status: 'disconnected'})
  }

  hearIdResponse = (newId) => {
    this.setState({ id: newId });
  }

  render() {
    console.log('Socket status: ' + this.state.status);
    console.log('Socket ID: ' + this.state.id);
    return (
      <Popup voting={true}/>
    );
  }
}

export default Homepage
