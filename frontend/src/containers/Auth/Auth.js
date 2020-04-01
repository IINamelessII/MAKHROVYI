import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import classes from './Auth.css';
import anonImage from '../../assets/images/anon64-2.png';

class Auth extends Component {

  componentDidMount() {
    this.props.loadUserData();
  }

  render() {
    const signinClasses = [classes.SignIn];
    if (this.props.signinHighlight) {
      signinClasses.push(classes.Highlight);
    }

    let auth = (
      <div className={classes.Auth}>
        <div className={classes.SubContainer}>
          <div className={signinClasses.join(' ')} onClick={() => {window.location.href = '/accounts/google/login/'}}>sign in</div>
        </div>
        <div className={classes.Photo}>
          <img src={anonImage} alt="" />
        </div>
        </div>
    );

    if (this.props.userData) {
      auth = (
        <div className={classes.Auth}>
          <div className={classes.SubContainer}>
            <div className={classes.SignOut} onClick={this.props.logout}>sign out</div>
          </div>
          <div className={classes.Photo}>
            <img src={this.props.userData.photo} alt="" />
            <div className={classes.Name}>{this.props.userData.name}</div>
          </div>
        </div>
      );
    }

    return auth;
  }
}

const mapStateToProps = state => {
  return {
    userData: state.auth.userData,
    signinHighlight: state.auth.signinHighlight,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch(actions.login()),
    logout: () => dispatch(actions.logout()),
    loadUserData: () => dispatch(actions.loadUserData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);