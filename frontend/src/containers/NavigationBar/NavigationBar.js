import React, {Component} from 'react';
import {connect} from 'react-redux';
import Media from 'react-media';

import * as actions from '../../store/actions/index';
import Logo from '../../components/Logo/Logo';
import NavigationLink from '../../components/NavigationLink/NavigationLink';
import Auth from '../Auth/Auth';

import classes from './NavigationBar.css';

class NavigationBar extends Component {
  componentDidMount() {
    this.props.loadUserData();
  }

  render() {
    
    return (
      <React.Fragment>
        <Media query="(max-width: 992px) and (min-width:601px)" render={() =>(
          <div className={classes.NavigationBar}>
            <div className={classes.SubContainer}>
              <Logo />
              <Auth />
            </div>
            <nav>
              <NavigationLink exact link="/">Solutions</NavigationLink>
              <NavigationLink link="/tutorials">Tutorials</NavigationLink>
              <NavigationLink link="/info">Info</NavigationLink>
            </nav>
            </div>
        )} />

        <Media query="(min-width: 993px), (max-width:600px)" render={() => (
          <div className={classes.NavigationBar}>
            <Logo />
            <nav>
              <NavigationLink exact link="/">Solutions</NavigationLink>
              <NavigationLink link="/tutorials">Tutorials</NavigationLink>
              <NavigationLink link="/info">Info</NavigationLink>
            </nav>
            <Auth />
            </div>
        )} />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUserData: () => dispatch(actions.loadUserData()),
  };
};

export default connect(null, mapDispatchToProps)(NavigationBar);