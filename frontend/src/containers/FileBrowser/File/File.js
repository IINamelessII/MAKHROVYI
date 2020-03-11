import React, {Component} from 'react';
import axios from '../../../axios-fileBrowser';

import classes from './File.css';


class File extends Component {
  onContextMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.showContextMenu(null, this.fileOptions); //event = null, options = fileOptions
  }

  fileOptions = [
    {"label": "download", "action":() => {this.download()}},
    {"label": "properties", "action":() => {console.log("properties")}, "holdBackdrop": true},
  ]

  download = () => {
    axios.post('/download/', {id: parseInt(this.props.id)})
      .then(response => {
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = response.data;
        const filename = this.props.name + '.' + this.props.ext;
        a.setAttribute('download', filename);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    //TODO: Add different icons depends on this.props.ext
    let fullNameClassName = classes.None;
    if (this.props.name.length + this.props.ext.length >= 14) {
      fullNameClassName = classes.FullName;
    }

    return (
      <div 
        className={classes.File}>
        <div className={classes.ImageContainer}>
          <img 
          src={require('../../../assets/images/file.png')} 
          alt=""
          onContextMenu={(event) => this.onContextMenu(event)}/>
        </div>
        <div className={classes.FileName}>
          <div className={classes.FlexName}>
            {this.props.name}
          </div>
          <div className={fullNameClassName}>
            {this.props.name}.{this.props.ext}
          </div>
        </div>
      </div>
    );
  }
}

export default File;