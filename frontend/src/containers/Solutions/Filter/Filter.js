import React, {Component} from 'react';

import classes from './Filter.css';

class Filter extends Component {
  render() {
    const facultiesList = this.props.items.map((item) => {
      return <div key={item}>{item}</div>
    })

    return (
      <div className={classes.Filter}>
        {facultiesList}
      </div>
    );
  }
}

export default Filter;