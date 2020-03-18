import React, {Component} from 'react';

import classes from './Message.css';

import {message} from '../../../shared/constants';

class Message extends Component {
  state = {
    show: message.show,
  }

  closeMessage = () => {
    this.setState({show: false});
  }

  render() {
    let messageContent = null;
    if (this.state.show) {
      messageContent = (
        <div className={classes.Message}>
          <div className={classes.HeaderContainer}>
            <div></div>
            <div className={classes.Header}>
              {message.header}
            </div>
            <div 
              className={classes.CloseButton}
              onClick={this.closeMessage}>x</div>
          </div>

          <div className={classes.Text}>
            {message.message}
          </div>
        </div>
      );
    }

    return messageContent;
  }
}

export default Message;