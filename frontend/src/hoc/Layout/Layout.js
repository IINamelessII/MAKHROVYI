import React, {Component} from 'react';
import {connect} from 'react-redux';

import ContextMenu from '../../containers/FileBrowser/ContextMenu/ContextMenu';

import classes from './Layout.css';

class Layout extends Component {

  render() {
    return (
      <div className={classes.Layout}>
        {this.props.children}
        {this.props.showContextMenu ? (
            <ContextMenu
              options={this.props.options} />
          ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showContextMenu: state.fileBrowser.showContextMenu,
    options: state.fileBrowser.contextMenuOptions,
    showInfoCard: state.fileBrowser.showInfoCard,
  };
};

export default connect(mapStateToProps)(Layout);