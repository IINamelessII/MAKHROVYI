import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

import classes from './NavigationLink.css';

class NavigationLink extends Component {
  render() {

    return (
        <div className={classes.NavigationLink}>
          <NavLink 
            to={this.props.link} 
            exact={this.props.exact}>
            {this.props.children}
          </NavLink>
        </div>    
    );
  }
}

export default NavigationLink;