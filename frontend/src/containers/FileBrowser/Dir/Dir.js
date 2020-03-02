import React, {Component} from 'react';
import {connect} from 'react-redux';

import ContextMenu from '../ContextMenu/ContextMenu';
import * as actions from '../../../store/actions/index';

import classes from './Dir.css';

import {dirOptions} from '../../../shared/constants';

class Dir extends Component {
  state = {
    showContextMenu: false,
  }

  showContextMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onContextMenuShow(this.hideContextMenu);
    this.setState({showContextMenu: true});
  }

  hideContextMenu = (event) => {
    this.setState({showContextMenu: false});
  }

  onDirClick = () => {
    this.props.click();
    this.props.open();
  }

  render() {
    return (
      <div 
        className={classes.Dir}>
        <div className={classes.ImageContainer}>
          <img 
          src={require('../../../assets/images/folder.png')} 
          alt=""
          onClick={this.onDirClick}
          onContextMenu={this.showContextMenu}/>
        </div>
        <div className={classes.DirName}>
          <div>
            {this.props.name}
          </div>
        </div>
        {this.state.showContextMenu ? (
          <ContextMenu
            options={dirOptions} />
        ) : null}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onContextMenuShow: (backdropFunction) => dispatch(actions.setBackdrop(backdropFunction)),
  };
}

export default connect(null, mapDispatchToProps)(Dir);