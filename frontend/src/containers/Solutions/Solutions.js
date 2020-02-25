import React, {Component} from 'react';

import classes from './Solutions.css';
import Filter from './Filter/Filter';
import {subjects} from '../../shared/constants';

class FilterList extends Component {
  state = {
    faculty: null,
    department: null,
    semester: null,
  }

  render() {
    const faculties = Object.keys(subjects);

    return (
      <div className={classes.FilterList}>
        <Filter items={faculties} />
      </div>
    );
  }
}

export default FilterList;