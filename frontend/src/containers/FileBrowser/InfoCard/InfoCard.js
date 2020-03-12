import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './InfoCard.css';
import * as actions from '../../../store/actions/index';

class InfoCard extends Component {

  render() {
    let name = this.props.data.name;
    if (this.props.data.ext) {
      name += '.' + this.props.data.ext;
    }

    return (
      <div 
        className={classes.Container}
        onClick={this.props.onBackdropHide}>
        <div 
          className={classes.InfoCard}
          onClick={(e) => {e.stopPropagation()}}>
          <div className={classes.Header}>
            <div className={classes.Title}>Properties of {name}</div>
            <div 
              className={classes.CloseButton}
              onClick={this.props.onBackdropHide}>x</div>
          </div>
          <div className={classes.Info}>
            SOME INFO HERE
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.fileBrowser.infoCardData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onBackdropHide: () => dispatch(actions.hideBackdrop()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoCard);

