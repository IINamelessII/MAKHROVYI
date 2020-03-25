import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../../axios-fileBrowser';

import classes from './FilesUploadInput.css';

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
        console.log('Nice!');
        console.log(response);
      })
      .catch(error => {
        console.log('(((');
        console.log(error);
      });
  }

  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.FilesUploadInput}>

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

export default connect(mapStateToProps)(FilesUploadInput);