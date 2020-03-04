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
          <div>
            {this.props.name}
          </div>
        </div>
      </div>
    );
  }
}

export default Dir;