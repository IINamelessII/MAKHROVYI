import React, {Component} from 'react';

import axios from '../../axios-fileBrowser';
import classes from './Info.css';
import Spinner from '../../components/Spinner/Spinner';

class Info extends Component {
  state = {
    downloads: null,
    uploads: null,
    loading: true,
  }

  componentDidMount() {
    axios.get('/stats/')
      .then(response => {
        this.setState({
          downloads: response.data.downloads,
          uploads: response.data.uploads,
          loading: false,
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({loading: false});
      });
  }

  render() {
    let stats = (
      <div className={classes.Stats}>
        <Spinner />
      </div>
    );
    if (!this.state.loading) {
      stats = (
        <div className={classes.Stats}>
          <div className={classes.Stat}>
            <div className={classes.Label}>File Downloads: </div>
            <div className={classes.Count}>{this.state.downloads}</div>
          </div>
          <div className={classes.Stat}>
            <div className={classes.Label}>File Uploads: </div>
            <div className={classes.Count}>{this.state.uploads}</div>
          </div>
        </div>
      );
    }

    return (
      <div className={classes.Info}>
        {stats}
        <div className={classes.Rules}>
          <p className={classes.Rule}>Everybody can download solutions as separated files or whole directories.</p>
          <p className={classes.Rule}>Everybody can upload files and create directories after authentication.</p>
          <p className={classes.Rule}>Please respect other users and do not duplicate existing directories.</p>
        </div> 
      </div>
    );
  }
}

export default Info;