import React from 'react';
import classes from './InfoCarf.css';


class InfoCard {
  render() {
    return (
      <div className={classes.InfoCard}>
        {props.name}
      </div>
    );
  }
}

export default InfoCard;

