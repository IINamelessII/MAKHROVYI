import React from 'react';
import classes from './Logo.css';

const logo = () => {
  return (
    <div className={classes.Logo} >
      <div className={classes.Title}>
        MAKHROVYI
      </div>
      <div>
        Ооо, панове...
      </div>
    </div>
  );
}

export default logo;