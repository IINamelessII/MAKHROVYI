import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './NavigationLink.css';

const navigationLink = (props) => {
  return (
      <NavLink
        to={props.link}><div className={classes.NavigationLink} >
          {props.children}
          </div>
      </NavLink>
    
  );
}

export default navigationLink;