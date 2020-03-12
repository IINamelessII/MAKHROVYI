import React, {Component} from 'react';
import axios from '../../../axios-fileBrowser';

import classes from './FileUploadInput.css';

class FileUploadInput extends Component {
  state = {
    uploading: false,
    formRef: React.createRef()
  }

  

  uploadFile = (event) => {
    event.preventDefault();
    const data = new FormData(this.state.formRef.current);
    axios({
      method: 'post',
      url: '/upload_file/',
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
      <div className={classes.FileUploadInput}>
        <form onSubmit={this.uploadFile} ref={this.state.formRef} enctype="multipart/form-data">
          <input name="file" type="file"/>
        </form>
        <div
          onClick={() =>this.state.formRef.current.dispatchEvent(new Event("submit"))}>
          SEND
        </div>
      </div>
    );
  }
}

export default FileUploadInput;