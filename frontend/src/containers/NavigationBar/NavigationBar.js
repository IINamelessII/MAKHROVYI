import React, {Component} from 'react';

import classes from './NavigationBar.css';
import Logo from '../../components/Logo/Logo';
import NavigationLink from '../../components/NavigationLink/NavigationLink';

class NavigationBar extends Component {
  render() {
    return (
      <div className={classes.NavigationBar}>
        <Logo />
        <NavigationLink>Palevo</NavigationLink>
        <NavigationLink>Tutorial</NavigationLink>
        <NavigationLink>Upload</NavigationLink>
      </div>
    );
  }
}

export default NavigationBar;