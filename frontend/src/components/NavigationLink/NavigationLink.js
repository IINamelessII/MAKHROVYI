import React from 'react';
import classes from './NavigationLink.css';

const navigationLink = (props) => {
  return (
    <div className={classes.NavigationLink} >
      {props.children}
    </div>
  );
}

export default navigationLink;