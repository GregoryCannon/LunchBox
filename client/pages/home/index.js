import React, { Component } from 'react';
import styles from './stylesheet.styl';
import Popup from '../../components/common/popup'

import io from 'socket.io-client';
const socket = io('http://localhost:' + process.env.PORT || 3000;)

export class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'disconnected',
      id: ''
    }
  }

  componentWillMount() {
    socket.on('connect', this.connect);
    socket.on('disconnect', this.disconnect);
    socket.on('idResponse', this.hearIdResponse);
    socket.on('message', this.hearMessage);
  }

  connect = () => {
    this.setState({ status: 'connected' });
    socket.emit('requestId');
    socket.emit('joinRoom', 77);
  }

  disconnect = () => {
    this.setState({ status: 'disconnected'})
  }

  hearIdResponse = (newId) => {
    this.setState({ id: newId });
  }

  hearMessage = (message) => {
    console.log('Recieved message: ' + message);
  }

  render() {
    console.log('Socket status: ' + this.state.status);
    console.log('Socket ID: ' + this.state.id);
    return (
      <Popup voting={true}/>
    );
  }
}

export default Homepage;
