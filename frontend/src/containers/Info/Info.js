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
        <section>
          <div className={classes.Title}>Rules:</div>
          <div className={classes.Rules}>
            <div className={classes.Rule}>Everybody can download solutions as separated files or whole directories.</div>
            <div className={classes.Rule}>Everybody can upload files and create directories after authentication.</div>
            <div className={classes.Rule}>Please respect other users and do not duplicate existing directories.</div>
          </div>
        </section>
        
        <section>
          <div className={classes.Title}>Statistic:</div>
          {stats}
        </section>

        <section>
          <div className={classes.Title}>Contacts:</div>
          <div className={classes.Contacs}>
            <a href="https://t.me/IINamelessII">If you find a bug or want to help with this project</a>
          </div>
        </section>
        
      </div>
    );
  }
}

export default Info;