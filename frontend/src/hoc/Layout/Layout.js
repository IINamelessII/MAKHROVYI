import React, {Component} from 'react';

import Backdrop from './Backdrop/Backdrop';

class Layout extends Component {

  render() {
    return (
      <div>
        {this.props.children}
        <Backdrop />
      </div>
    );
  }
}

export default Layout;