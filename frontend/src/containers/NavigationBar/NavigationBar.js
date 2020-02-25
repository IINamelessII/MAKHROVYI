import React, {Component} from 'react';

import classes from './NavigationBar.css';
import Logo from '../../components/Logo/Logo';
import NavigationLink from '../../components/NavigationLink/NavigationLink';

class NavigationBar extends Component {
  render() {
    return (
      <div className={classes.NavigationBar}>
        <Logo />
        <NavigationLink link="/">Solutions</NavigationLink>
        <NavigationLink link="/tutorials">Tutorials</NavigationLink>
        <NavigationLink link="/upload">Upload</NavigationLink>
      </div>
    );
  }
}

export default NavigationBar;