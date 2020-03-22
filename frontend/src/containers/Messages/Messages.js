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

const mapStateToProps = state => {
  return {
    messages: state.messages.messages,
    sessionMessages: state.messages.sessionMessages,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeMessage: (key) => dispatch(actions.removeMessage(key)),
    unsetMessage: (key) => dispatch(actions.unsetMessage(key)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);