import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

import classes from './Logo.css';

class Logo extends Component {
  render() {
    return (
      <div className={classes.Logo}>
        <NavLink to="/">
          <div className={classes.Title}>
            MAKHROVYI
          </div>
        </NavLink>
        <div className={classes.Subtitle}>
            Ооо, панове...
            <div className={classes.Face}></div>
          </div>
      </div>
    );
  }
}

export default Logo;