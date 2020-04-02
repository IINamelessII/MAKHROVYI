import React, {Component} from 'react';

import Backdrop from '../Layout/Backdrop/Backdrop';

import classes from './Screen.css';

class Screen extends Component {
  render() {
    return (
      <div className={classes.Screen} id="Screen">
        {this.props.children}
        <Backdrop />
      </div>
    );
  }
}

export default Screen;