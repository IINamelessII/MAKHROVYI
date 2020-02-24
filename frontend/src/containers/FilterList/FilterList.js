import React, {Component} from 'react';

import classes from './FilterList.css';
import Filter from './Filter/Filter';

class FilterList extends Component {
  render() {
    return (
      <div className={classes.FilterList}>
        <Filter />
        <Filter />
        <Filter />
        <Filter />
      </div>
    );
  }
}

export default FilterList;