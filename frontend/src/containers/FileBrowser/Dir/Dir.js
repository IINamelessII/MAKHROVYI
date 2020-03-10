import React, {Component} from 'react';
import axios from '../../../axios-fileBrowser';

import classes from './Dir.css';

class Dir extends Component {
  onContextMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.showContextMenu(null, this.dirOptions);
  }

  dirOptions = [
    {"label": "open", "action":() => {this.props.open()}},
    {"label": "download", "action":() => {this.download()}},
    {"label": "properties", "action":() => {console.log("properties")}},
  ]

  download = () => {
    axios.post('/archive/', {id: parseInt(this.props.id)})
      .then(response => {
        console.log(response);
        console.log()
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = response.data;
        const filename = this.props.name + '.zip';
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