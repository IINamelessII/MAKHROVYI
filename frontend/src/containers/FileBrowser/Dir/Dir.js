import React, {Component} from 'react';

import classes from './Dir.css';

import {dirOptions} from '../../../shared/constants';

class Dir extends Component {
  onContextMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.showContextMenu(null, dirOptions); //event = null, options = dirOptions
  }

  render() {
    let fullNameClassName = classes.None;
    if (this.props.name.length >= 15) {
      fullNameClassName = classes.FullName;
    }

    return (
      <div 
        className={classes.Dir}>
        <div className={classes.ImageContainer}>
          <img 
          src={require('../../../assets/images/folder.png')} 
          alt=""
          onClick={this.props.open}
          onContextMenu={(event) => this.onContextMenu(event)}/>
        </div>
        <div className={classes.DirName}>
          <div className={classes.FlexName}>
            {this.props.name}
          </div>
          <div className={fullNameClassName}>
            {this.props.name}
          </div>
        </div>
      </div>
    );
  }
}

export default Dir;