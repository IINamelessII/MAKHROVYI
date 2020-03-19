import React from 'react';

import classes from './PathPart.css';

const pathPart = (props) => {
  return (
    <div className={classes.PathPart}>
      <div onClick={props.goToPath}>{props.pathPartName}</div>
      {props.pathPartName !== '~/' ? "/" : ''}
    </div>
  );
}

export default pathPart;