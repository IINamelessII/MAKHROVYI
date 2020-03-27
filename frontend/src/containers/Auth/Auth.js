import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import classes from './Auth.css';

class Auth extends Component {
  render() {
    return (
      <div className={classes.Auth}>
        AUTH
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // user: state.auth.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // login: () => dispatch(actions.login()),
    // logout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);