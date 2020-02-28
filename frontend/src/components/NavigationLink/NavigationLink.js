import React from 'react';
import {NavLink} from 'react-router-dom';

const navigationLink = (props) => {
  return (
      <NavLink
        to={props.link}><div>
          {props.children}
          </div>
      </NavLink>
    
  );
}

export default navigationLink;