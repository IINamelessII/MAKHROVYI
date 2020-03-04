import React, {Component} from 'react';

import classes from './File.css';

import {fileOptions} from '../../../shared/constants';

class File extends Component {
  onContextMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.showContextMenu(null, fileOptions); //event = null, options = fileOptions
  }

  render() {
    return (
      <div 
        className={classes.File}>
        <div className={classes.ImageContainer}>
          <img 
          src={require('../../../assets/images/folder.png')} 
          alt=""
          onContextMenu={(event) => this.onContextMenu(event)}/>
        </div>
        <div className={classes.FileName}>
          <div>
            {this.props.name}.{this.props.ext}
          </div>
        </div>
      </div>
    );
  }
}

export default File;