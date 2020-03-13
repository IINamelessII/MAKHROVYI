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
      <div className={classes.Input}>
        <div className={classes.Label}>{this.props.label}</div>
        <input 
          type="text"
          onChange={this.onInputChange}
          value={this.state.value}
           />
        <div className={classes.Buttons}>
          <div 
            className={classes.Button + ' ' + classes.Negative}
            onClick={this.props.onFial
          }>{this.props.failLabel}</div>
          <div 
            className={classes.Button + ' ' + classes.Positive}
            onClick={() => this.props.onSuccess(this.state.value)}
          >{this.props.successLabel}</div>
        </div>
      </div>
    );
  }
}

export default Input;