import React, {Component} from 'react';

import classes from './Input.css';

class Input extends Component {
  state = {
    value: '',
  }

  onInputChange = (event) => {
    const newValue = event.target.value;
    this.setState({value: newValue});
  }

  render() {
    //TODO: Add confirmation
    return (
      <div 
        className={classes.Container}
        onClick={this.props.onContainerClick}>
        <div 
          className={classes.Input}
          onClick={(e) => {e.stopPropagation()}}>
          <div className={classes.Header}>{this.props.label}</div>
          <input 
            type="text"
            onChange={this.onInputChange}
            value={this.state.value}
            autoFocus
            />
          <div className={classes.Buttons}>
            <div 
              className={classes.Button + ' ' + classes.Negative}
              onClick={this.props.onFail}
            >{this.props.failLabel}</div>
            <div 
              className={classes.Button + ' ' + classes.Positive}
              onClick={() => this.props.onSuccess(this.state.value)}
            >{this.props.successLabel}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Input;