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

    const date_obj = new Date(this.props.data.created_date);
    let date_str = date_obj.toString();
    date_str = date_str.slice(0, date_str.length - 40);

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

            <div className={classes.Property}>
              <div className={classes.label}>Name:</div>
              <div className={classes.Value}>{this.props.data.name}</div>
            </div>

            <div className={classes.Property}>
              <div className={classes.label}>Type:</div>
              <div className={classes.Value}>text/txt</div>
            </div>

            <div className={classes.Property}>
              <div className={classes.label}>Downloaded:</div>
              <div className={classes.Value}>{this.props.data.downloads} times</div>
            </div>

            <div className={classes.Property}>
              <div className={classes.label}>Created date</div>
              <div className={classes.Value}>{date_str}</div>
            </div>

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

