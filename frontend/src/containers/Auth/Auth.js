import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import classes from './Auth.css';
import anonImage from '../../assets/images/anon64-2.png';

class Auth extends Component {

  componentDidMount() {
    this.props.loadUserData();
  }

  onSignInClickHandler = () => {
    const left = (window.screen.width / 2) - 200;
    const top = (window.screen.height / 2) - 175; 
    const wnd = window.open('/accounts/google/login/', 'Sign In', `directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=400,height=350,top=${top},left=${left}`);

    const interval = setInterval(() => {
      try {
        if (wnd.location.pathname === '/') {
          wnd.close();
          clearInterval(interval);
          window.location.reload();
        }
      } catch (error) {
      }
    }, 100);
  }

  render() {
    const signinClasses = [classes.SignIn];
    if (this.props.signinHighlight) {
      signinClasses.push(classes.Highlight);
    }

    let auth = (
      <div className={classes.Container}>
          <div className={classes.Photo}>
            <img src={anonImage} alt="" />
          </div>
          <div className={signinClasses.join(' ')} onClick={this.onSignInClickHandler}>sign in</div>
        </div>
    );

    if (this.props.userData) {
      auth = (
        <div className={classes.Container}>
          <div className={classes.Photo}>
            <img src={this.props.userData.photo} alt="" />
            <div className={classes.Name}>{this.props.userData.name}</div>
          </div>
          <div className={classes.SignOut} onClick={this.props.logout}>sign out</div>
        </div>
      );
    }

    return (
      <div className={classes.Auth}>
        {auth}
      </div>
    );
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
    // setSigninHighlight: (highlight) => dispatch(actions.setSigninHighlight(highlight)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);