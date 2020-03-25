import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../../axios-fileBrowser';

import classes from './FilesUploadInput.css';
import * as actions from '../../../store/actions/index';

class FilesUploadInput extends Component {
  state = {
    files: [],
  }

  formRef = React.createRef()

  uploadFiles = (event) => {
    event.preventDefault();
    const data = new FormData();
    for (let file of this.state.files) {
      data.append('file', file);
    }
    console.log(data.getAll('file'));
    const dirId = parseInt(this.props.hashPath[this.props.hashPath.length - 1]);
    axios({
      method: 'post',
      url: '/upload_files/' + dirId + '/',
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

  onInputChangeHandler = () => {
    //Handle copys, allow only unique files, connect messages
    const files = [...this.state.files];
    this.setState({files: files.concat(Array.from(document.getElementById('SelectFiles').files))});
  }

  removeFile = (index) => {
    const files = [...this.state.files];
    files.splice(index, 1);
    this.setState({files: files});
  }

  render() {
    let filesList = <div>Please Select Files</div>;

    if (this.state.files.length) {
      filesList = this.state.files.map((file, index) => {
        return (
          <div className={classes.FileItem} key={index}>
            <div className={classes.FileName}>{file.name}</div>
            <div className={classes.FileSize}>{file.size}</div>
            <div 
              className={classes.RemoveFileButton}
              onClick={() => this.removeFile(index)}>x</div>
          </div>
        );
      });
    }
    
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

          <form onSubmit={this.uploadFiles} ref={this.formRef} encType="multipart/form-data">
            <input 
              type='file'
              multiple={true}
              name='file'
              id="SelectFiles"
              onChange={this.onInputChangeHandler}/>
          </form>

          <div className={classes.FileList}>{filesList}</div>

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