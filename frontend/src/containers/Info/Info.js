import React, {Component} from 'react';
import {connect} from 'react-redux';

import axios from '../../axios-fileBrowser';
import classes from './Info.css';
import Spinner from '../../components/Spinner/Spinner';
import * as actions from '../../store/actions/index';

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
        this.props.addMessage('Something went wrong');
        this.setState({loading: false});
      });
  }

  render() {
    let stats = (
      <div className={classes.Stats}>
        <div className={classes.Loading}>
          <Spinner />
        </div>
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
      <div className={classes.Outer}>
        <div className={classes.Info}>
          <section>
            <div className={classes.Title}>Rules:</div>
            <div className={classes.Container}>
              <div className={classes.Rules}>
                <div className={classes.Rule}>Everybody can download solutions as separated files or whole directories.</div>
                <div className={classes.Rule}>Everybody can upload files and create directories after authentication.</div>
                <div className={classes.Rule}>Please respect other users and do not duplicate existing directories.</div>
              </div>
            </div>
          </section>
          
          <section>
            <div className={classes.Title}>Statistic:</div>
            <div className={classes.Container}>{stats}</div>
          </section>

          <section>
            <div className={classes.Title}>Contacts:</div>
            <div className={classes.Container}>
              <div className={classes.Contacts}>
                <div className={classes.ContactInfo}>If you find a bug or want to help with this project</div>
                <a href="https://t.me/IINamelessII">@IINamelessII</a>
              </div>
            </div>
          </section>

          <section>
            <div className={classes.Title}>Created by:</div>
            <div className={classes.Container}>
              <div className={classes.Creators}>
                <div className={classes.NeLyublyuVerstku}>
                  <div className={classes.List}>
                    <div className={classes.Creator}>Design:</div>
                    <div className={classes.Creator}>Layout:</div>
                    <div className={classes.Creator}>Frontend:</div>
                    <div className={classes.Creator}>Backend:</div>
                    <div className={classes.Creator}>Deploy:</div>
                  </div>
                  <div className={classes.Position}>
                    <div className={classes.Self}>ВСЁ САМ :)</div>
                    <div className={classes.PtushkinFace}></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMessage: (message) => dispatch(actions.addMessage(message)),
  }
}

export default connect(null, mapDispatchToProps)(Info);