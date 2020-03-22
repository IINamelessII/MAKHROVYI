import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import classes from './Messages.css';

import Message from './Message/Message';

class Messages extends Component {
  render() {
    let messages = null;
    let alsoMessages = null;

    if (this.props.messages) {
      messages = Object.entries(this.props.messages);
      messages = messages.map(item => {
        return (
          <Message
            key={item[0]} 
            message={item[1]}
            click={() => this.props.removeMessage(item[0])}/>
        );
      });
    }

    if (this.props.sessionMessages) {
      alsoMessages = Object.entries(this.props.sessionMessages);
      alsoMessages = alsoMessages.map(item => {
        return (
          <Message 
            key={item[0]}
            message={item[1]}
            click={() => this.props.unsetMessage(item[0])}/>
        );
      });
    }

    return (
      <div className={classes.Messages}>
        {messages}
        {alsoMessages}
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