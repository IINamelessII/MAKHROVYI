import React, {Component} from 'react';

import classes from './Filter.css';

class Filter extends Component {
  render() {
    const list = this.props.items.map((item) => {
      return (
        <div
          key={item}
          onClick={() => this.props.onSelect(item)}>{item}</div>);
    })

    return (
      <div className={classes.Filter}>
        {list}
      </div>
    );
  }
}

export default Filter;