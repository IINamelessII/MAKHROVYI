import React, {Component} from 'react';

import classes from './Screen.css';
import FilterList from '../FilterList/FilterList';

class Screen extends Component {
  render() {
    return (
      <div className={classes.Screen}>
        <FilterList />
        Screen
      </div>
    );
  }
}

export default Screen;