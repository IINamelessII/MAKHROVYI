import React from 'react';

import classes from './Message.css';

const message = props => {
  return (
    <div className={classes.Message}>
      <div className={classes.CloseButton} onClick={props.click}>x</div>
      <div className={classes.Text}>{props.message}</div>
    </div>
  );
};

export default message;