import React from 'react';
import Media from 'react-media';

import classes from './Footer.css';

const footer = props => {
  return (
    <div className={classes.Footer}>
      <span className={classes.Label}><a href="https://github.com/IINamelessII">© 2019 Oleh Serikov, Inc</a></span>
      <Media query="(max-width: 600px)" render={() => (
        <div className={classes.Container}>
          <span className={classes.Label}><a href="https://github.com/IINamelessII/MAKHROVYI/blob/master/LICENSE">License</a></span>
          <span className={classes.Label}><a href="/info">Information</a></span>
        </div>
      )} />
      <Media query="(min-width: 601px)" render={() => (
        <React.Fragment>
          <span className={classes.Label}><a href="https://github.com/IINamelessII/MAKHROVYI/blob/master/LICENSE">License</a></span>
          <span className={classes.Label}><a href="/info">Information</a></span>
        </React.Fragment>
      )} />
    </div>
  );
};

export default footer;