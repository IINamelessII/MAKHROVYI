import React from 'react';

import classes from './Footer.css';

const footer = props => {
  return (
    <div className={classes.Footer}>
      {/* <div className={classes.Labels}> */}
        <span className={classes.Label}>© 2019 Oleh Serikov, Inc</span>
        <span className={classes.Label}><a href="https://github.com/IINamelessII/MAKHROVYI">License</a></span>
        <span className={classes.Label}><a href="/info">Information</a></span>
      {/* </div> */}
    </div>
  );
};

export default footer;