import React, {Component} from 'react';

import Logo from '../../components/Logo/Logo';
import NavigationLink from '../../components/NavigationLink/NavigationLink';
import Auth from '../Auth/Auth';

import classes from './NavigationBar.css';

class NavigationBar extends Component {
  render() {
    
    return (
      <div className={classes.NavigationBar}>
        <div className={classes.Container}>
          <Logo />
          <nav>
            <NavigationLink exact link="/">Solutions</NavigationLink>
            <NavigationLink link="/tutorials">Tutorials</NavigationLink>
            <NavigationLink link="/upload">Upload</NavigationLink>
          </nav>
          <Auth />
        </div>
      </div>
    );
  }
}

export default NavigationBar;