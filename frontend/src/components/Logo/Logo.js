import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Logo.css';

const logo = () => {
  return (
    <NavLink to="/">
      <div className={classes.Logo} >
        <div className={classes.Title}>
          {/* <h3> */}
            MAKHROVYI
          {/* </h3> */}
        </div>
        <div className={classes.SubTitle}>
          {/* <h5> */}
            Ооо, панове...
          {/* </h5> */}
        </div>
      </div>
    </NavLink>
  );
}

export default logo;