import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './Logo.css';

const logo = () => {
  return (
    <div className={classes.Logo}>
      <NavLink to="/">
        <div className={classes.Title}>
          MAKHROVYI
        </div>
        <div className={classes.Subtitle}>
          Ооо, панове...
        </div>
      </NavLink>
    </div>
  );
}

export default logo;