import React, {Component} from 'react';

import classes from './Layout.css';

class Layout extends Component {

  render() {
    return (
      <div className={classes.Layout}>
        {this.props.children}
      </div>
    );
  }
}

export default Layout;