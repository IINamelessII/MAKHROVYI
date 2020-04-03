import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../../axios-fileBrowser';

import classes from './Dir.css';
import * as actions from '../../../store/actions/index';
import {baseUrl} from '../../../shared/constants';

class Dir extends Component {
  onContextMenu = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.props.showContextMenu(null, this.dirOptions);
  }

  dirOptions = this.props.permission ? [
    {"label": "open", "action":() => {this.props.open()}, "holdBackdrop": false},
    {"label": "download", "action":() => {this.downloadClick()}, "holdBackdrop": false},
    {"label": "copy link", "action": () => {this.copyLinkClick()}, "holdBackdrop": false},
    {"label": "rename", "action": () => {this.renameClick()}, "holdBackdrop": true},
    {"label": "remove", "action": () => {this.removeClick()}, "holdBackdrop": false},
    {"label": "properties", "action":() => {this.propertiesClick()}, "holdBackdrop": true},
  ] : [
    {"label": "open", "action":() => {this.props.open()}, "holdBackdrop": false},
    {"label": "download", "action":() => {this.downloadClick()}, "holdBackdrop": false},
    {"label": "copy link", "action": () => {this.copyLinkClick()}, "holdBackdrop": false},
    {"label": "properties", "action":() => {this.propertiesClick()}, "holdBackdrop": true},
  ]

  handleButtonPress = () => {
    this.buttonPressTimer = setTimeout(() => {
      this.showContextMenu(null);
    }, 800);
  }

  handleButtonRelease = () => {
    clearTimeout(this.buttonPressTimer);
  }

  downloadClick = () => {
    axios.post('/archive/', {id: parseInt(this.props.id)})
      .then(response => {
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = response.data;
        const filename = this.props.name + '.zip';
        a.setAttribute('download', filename);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        const token = response.headers['content-disposition'].slice(21);
        axios.post('/archive_received/', {token: token});
      })
      .catch(error => {
        console.log(error);
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
    const copyText = document.getElementById('dir-link' + this.props.id);
    copyText.focus();
    copyText.setSelectionRange(0, 99999); //For Mobile Devices
    document.execCommand('copy');

    this.props.addMessage('Link was successfully copied to clipboard.');
  }

  render() {
    const fullNameClasses = [classes.None];
    if (this.props.name.length >= 15) {
      fullNameClasses.push(classes.FullName);
    }

    return (
      <div 
        className={classes.Dir}>
        <div className={classes.ImageContainer}>
          <img 
          src={require('../../../assets/images/baseline_folder_white_48dp.png')} 
          alt=""
          onClick={this.props.open}
          onContextMenu={(event) => this.onContextMenu(event)}
          onTouchStart={this.handleButtonPress}
          onTouchEnd={this.handleButtonRelease} />
        </div>
        <div className={classes.DirName}>
          <div className={classes.FlexName}>
            {this.props.name}
          </div>
          <div className={fullNameClasses.join(' ')}>
            {this.props.name}
          </div>
        </div>
        <input
          type="text"
          id={'dir-link' + this.props.id}
          value={baseUrl + '/directories/' + parseInt(this.props.id)}
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

export default connect(null, mapDispatchToProps)(Dir);