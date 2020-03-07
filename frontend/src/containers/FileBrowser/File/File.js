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
    {"label": "properties", "action":() => {console.log("properties")}},
  ]

  download = () => {
    axios.post('/download/', {id: parseInt(this.props.id)})
      .then(response => {
        const fileDownload = require('js-file-download');
        // console.log(response.data);
        fileDownload(response.data, this.props.name + '.' + this.props.ext);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    //TODO: Add different icons depends on this.props.ext
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
          <div>
            {this.props.name}.{this.props.ext}
          </div>
        </div>
      </div>
    );
  }
}

export default File;