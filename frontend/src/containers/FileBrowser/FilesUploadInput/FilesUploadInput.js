import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../../axios-fileBrowser';

import classes from './FilesUploadInput.css';
import * as actions from '../../../store/actions/index';

class FilesUploadInput extends Component {
  state = {
    uploading: false,
  }

  formRef = React.createRef()

  uploadFile = (event) => {
    event.preventDefault();
    const data = new FormData(this.formRef.current);
    const dirId = parseInt(this.props.hashPath[this.props.hashPath.length - 1]);
    axios({
      method: 'post',
      url: '/upload_file/' + dirId + '/',
      data: data, 
      headers:{"content-type": 'application/form-data'},
    })
      .then(response => {
        this.props.rerender();
        this.props.hideBackdrop();
      })
      .catch(error => {
        console.log(error);
        this.props.hideBackdrop();
      });
  }

  render() {
    return (
      <div 
        className={classes.Container}
        onClick={this.props.hideBackdrop}>
        <div 
          className={classes.FilesUploadInput}
          onClick={(e) => {e.stopPropagation()}}>
          <div 
            className={classes.CloseButton}
            onClick={this.props.hideBackdrop}>x</div> 

          <form onSubmit={this.uploadFile} ref={this.formRef} enctype="multipart/form-data">
            <input name="file" type="file"/>
          </form>
          <div
            onClick={() => this.formRef.current.dispatchEvent(new Event("submit"))}>
            SEND
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    hashPath: state.fileBrowser.hashPath,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hideBackdrop: () => dispatch(actions.hideBackdrop()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilesUploadInput);