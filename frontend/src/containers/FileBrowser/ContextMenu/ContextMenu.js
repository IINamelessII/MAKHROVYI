import React, {Component} from 'react';

import classes from './ContextMenu.css';

class ContextMenu extends Component {
  state = {
    x: 0,
    y: 0,
  }

  moveContextMenu = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    this.setState({
      x: x,
      y: y,
    });
  }

  render() {
    //TODO add Redux action, that get coords from root(App) and add styling in ComponentWillRender

    const options = this.props.options.map((option) => {
      return (
        <div
          key={option.label}
          onClick={option.action}
          className={classes.ContextMenu}>{option.label}</div>
      );
    })

    return (
      <div 
        className={classes.Option}
        onMouseMove={this.moveContextMenu}
        style={{top: this.state.y + 'px', left:this.state.x + 'px',}}>
        {options}
      </div>
    );
  }
}

export default ContextMenu;

//TODO: Add Context menu over backdrop