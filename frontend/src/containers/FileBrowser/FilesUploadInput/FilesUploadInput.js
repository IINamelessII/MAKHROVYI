import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../../axios-fileBrowser';

import classes from './FilesUploadInput.css';
import * as actions from '../../../store/actions/index';
import {maxUplodSize, maxUploadSizeLabel} from '../../../shared/constants';

class FilesUploadInput extends Component {
  state = {
    files: [],
  }

  formRef = React.createRef()

  uploadClickHandler = () => {
    this.formRef.current.dispatchEvent(new Event("submit"))
  }

  uploadFiles = (event) => {
    event.preventDefault();

    if (this.state.files.length) {
      const data = new FormData();
      // eslint-disable-next-line
      for (let file of this.state.files) {
        data.append('file', file);
      }
      
      const dirId = parseInt(this.props.hashPath[this.props.hashPath.length - 1]);
      this.setState({files: []});
      this.props.hideBackdrop();
      axios({
        method: 'post',
        url: '/upload_files/' + dirId + '/',
        data: data, 
        headers:{"content-type": 'application/form-data'},
      })
        .then(response => {
          this.props.rerender();
        })
        .catch(error => {
          this.props.addMessage('Something went wrong');
        });
    } else {
      this.props.addMessage('Select files first');
    }
  }

  onInputChangeHandler = () => {
    const files = [...this.state.files];
    const fileNames = files.map(file => file.name);
    const newFiles = Array.from(document.getElementById('SelectFiles').files).filter(it => !fileNames.includes(it.name));

    const removeFile = (name, index) => {
      newFiles.splice(index, 1);
      this.props.addMessage('File ' + name + ' won\'t be uploaded, its size more than ' + maxUploadSizeLabel);
    }

    newFiles.map((file, idx) => file.size > maxUplodSize ? removeFile(file.name, idx) : null);
    this.setState({files: files.concat(newFiles)});
  }

  removeFile = (index) => {
    const files = [...this.state.files];
    files.splice(index, 1);
    this.setState({files: files});
  }

  onSelectFilesClick = () => {
    document.getElementById('SelectFiles').click();
  }

  render() {
    let filesList = <div className={classes.Holder}>Please Select Files Above</div>;
    let buttonClasses = [classes.Button];

    if (this.state.files.length) {
      filesList = this.state.files.map((file, index) => {
        return (
          <div className={classes.FileItem} key={index}>
            <div className={classes.FileName}>{file.name}</div>
            <div 
              className={classes.RemoveFileButton}
              onClick={() => this.removeFile(index)}>x</div>
          </div>
        );
      });
    } else {
      buttonClasses.push(classes.Disable);
    }
    
    return (
      <div 
        className={classes.Container}
        onClick={this.props.hideBackdrop}>
        <div 
          className={classes.FilesUploadInput}
          onClick={(e) => {e.stopPropagation()}}>

          <div></div>

          <div className={classes.Select}>
            <form onSubmit={this.uploadFiles} ref={this.formRef} encType="multipart/form-data">
              <input 
                type='file'
                multiple={true}
                name='file'
                id="SelectFiles"
                onChange={this.onInputChangeHandler}/>
            </form>
            <div className={classes.Choose} onClick={this.onSelectFilesClick}>
              <div className={classes.Label}>Click here to select files</div>
            </div>
          </div>
          
          <div className={classes.FileList}>{filesList}</div>
          <div className={classes.Buttons}>
            <div onClick={this.props.hideBackdrop} className={classes.Button}>cancel</div>
            <div onClick={this.uploadClickHandler} className={buttonClasses.join(' ')}>upload</div>
          </div>

          <div></div>

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
    addMessage: (msg) => dispatch(actions.addMessage(msg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilesUploadInput);