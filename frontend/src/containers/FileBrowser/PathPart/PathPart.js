import React from 'react';

import classes from './PathPart.css';

const pathPart = (props) => {
  //TODO Remove nested span and move ::after
  return (
    <span className={classes.PathPart}>
      <span onClick={props.goToPath}>{props.pathPartName}</span>
      {props.pathPartName !== '/' ? "/" : ''}
    </span>
  );
}

export default pathPart;