import React, {Component} from 'react';

import classes from './Screen.css';

class Screen extends Component {
  render() {
    return (
      <div className={classes.Screen}>
        {this.props.children}
      </div>
    );
  }
}

export default Screen;