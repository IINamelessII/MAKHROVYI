import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Logo.css';

const logo = () => {
  return (
    <NavLink to="/">
      <div className={classes.Logo} >
      <div className={classes.Title}>
        MAKHROVYI
      </div>
      <div>
        Ооо, панове...
      </div>
    </div>
    </NavLink>
  );
}

export default logo;