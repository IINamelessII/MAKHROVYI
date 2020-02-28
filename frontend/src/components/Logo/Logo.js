import React from 'react';
import {NavLink} from 'react-router-dom';

const logo = () => {
  return (
    <NavLink to="/">
      <div>
        <div>
          MAKHROVYI
        </div>
        <div>
          Ооо, панове...
        </div>
      </div>
    </NavLink>
  );
}

export default logo;