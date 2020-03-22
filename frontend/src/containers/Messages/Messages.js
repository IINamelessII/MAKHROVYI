import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import classes from './Messages.css';

import Message from './Message/Message';

class Messages extends Component {
  render() {
    let messages = null;
    return (
      <div className={classes.Messages}>
        {messages}
      </div>
    );
  }
}

export default Messages;