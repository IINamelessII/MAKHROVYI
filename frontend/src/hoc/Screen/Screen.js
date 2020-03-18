import React, {Component} from 'react';

import Backdrop from '../Layout/Backdrop/Backdrop';
import Message from './Message/Message';

import classes from './Screen.css';

class Screen extends Component {
  render() {
    return (
      <div className={classes.Screen}>
        {this.props.children}
        <Message />
        <Backdrop />
      </div>
    );
  }
}

export default Screen;