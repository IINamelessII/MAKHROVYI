import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './NavigationLink.css';

const navigationLink = (props) => {
  return (
    <div className={classes.NavigationLink} >
      <NavLink
        to={props.link}>{props.children}</NavLink>
    </div>
  );
}

export default navigationLink;