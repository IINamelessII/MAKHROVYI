import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../../axios-fileBrowser';

import classes from './File.css';
import * as actions from '../../../store/actions/index';
import {baseUrl} from '../../../shared/constants';


class File extends Component {
  state = {
    selected: this.props.selected,
  }

  onContextMenu = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.touchSelected();
    this.props.showContextMenu(null, this.fileOptions);
  }

  fileOptions = this.props.permission ? [
    {"label": "download", "action": () => {this.downloadClick()}, "holdBackdrop": false},
    {"label": "copy link", "action": () => {this.copyLinkClick()}, "holdBackdrop": false},
    {"label": "rename", "action": () => {this.renameClick()}, "holdBackdrop": true},
    {"label": "remove", "action": () => {this.removeClick()}, "holdBackdrop": false},
    {"label": "properties", "action": () => {this.propertiesClick()}, "holdBackdrop": true},
  ] : [
    {"label": "download", "action": () => {this.downloadClick()}, "holdBackdrop": false},
    {"label": "copy link", "action": () => {this.copyLinkClick()}, "holdBackdrop": false},
    {"label": "properties", "action": () => {this.propertiesClick()}, "holdBackdrop": true},
  ]

  handleButtonPress = () => {
    this.buttonPressTimer = setTimeout(() => {
      this.onContextMenu(null);
    }, 800);
  }

  handleButtonRelease = () => {
    clearTimeout(this.buttonPressTimer);
  }


  downloadClick = () => {
    axios.get('/download/' + parseInt(this.props.id) + '/')
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
        this.props.addMessage('Something went wrong');
      });
  }

  renameClick = () => {
    this.props.rename();
  }

  removeClick = () => {
    this.props.remove();
  }

  propertiesClick = () => {
    this.props.onSetInfoCard(this.props.info);
  }

  copyLinkClick = () => {
    const copyText = document.getElementById('file-link' + this.props.id);
    copyText.focus();
    copyText.setSelectionRange(0, 99999); //For Mobile Devices
    document.execCommand('copy');
    
    this.props.addMessage('Link was successfully copied to clipboard.');
  }

  touchSelected = () => {
    if (this.state.selected) {
      this.setState({selected: false});
      this.props.redirectToDir();
    }
  }

  render() {
    let styleClasses = [classes.File];
    if (this.props.selected) {
      styleClasses.push(classes.Selected);
    }

    const fullNameClasses = [classes.None];
    if (this.props.name.length + this.props.ext.length >= 9) {
      fullNameClasses.push(classes.FullName);
    }

    return (
      <div 
        className={styleClasses.join(' ')}>
        <div className={classes.ImageContainer}>
          <img 
          src={require('../../../assets/images/baseline_description_white_48dp.png')} 
          alt=""
          onContextMenu={(event) => this.onContextMenu(event)}
          onClick={this.props.selected ? this.touchSelected : this.downloadClick}
          onTouchStart={this.handleButtonPress}
          onTouchEnd={this.handleButtonRelease} />
        </div>
        <div className={classes.FileName}>
          <div className={classes.FlexName}>
            {this.props.name}.{this.props.ext}
          </div>
          <div className={fullNameClasses.join(' ')}>
            {this.props.name}.{this.props.ext}
          </div>
        </div>
        <input
          type="text"
          id={'file-link' + this.props.id}
          value={baseUrl + '/files/' + parseInt(this.props.id)}
          style={{position: 'absolute', left: '-9999px', top: '0'}}
          readOnly />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetInfoCard: (data) => dispatch(actions.setInfoCard(data)),
    addMessage: (message) => dispatch(actions.addMessage(message)),
    loadMessages: () => dispatch(actions.loadMessages()),
    
  }
}

export default connect(null, mapDispatchToProps)(File);