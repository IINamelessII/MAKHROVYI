

import React, {Component} from 'react';

class Backdrop extends Component {
  state = {
    show: false,
  }

  hide = () => {
    this.setState({show: false});
  }

  render() {
    return this.state.show ? (
      <div>
      </div>
    ) : null;
  }
}

export default Backdrop;