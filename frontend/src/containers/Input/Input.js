import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './Input.css';
import * as actions from '../../store/actions/index';

class Input extends Component {
  state = {
    value: this.props.value,
    messages: {},
    valid: true,
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.messages !== nextState.messages || this.state.value !== nextState.value;
  }

  componentDidMount() {
    document.getElementById('input').setSelectionRange(0, 99999); //For Mobile Devices
  }

  checkValidation = (newValue) => {
    let isValid = true;
    let check;
    const messages = {...this.state.messages};

    if (this.props.validation.length) {
      check = newValue.length <= this.props.validation.length;
      isValid = isValid && check;
      if (!check && !('length' in messages)) {
        messages['length'] = 'Value should be no longer than ' + this.props.validation.length + ' symbols';
      } 
    }

    if (this.props.validation.blackList.values.length) {
      check = !(this.props.validation.blackList.values.includes(newValue.toLowerCase()));
      isValid = isValid && check;
      if (!check && !('unique' in messages)) {
        messages['unique'] = this.props.validation.blackList.message;
      } 
    }

    this.setState({
      messages: messages,
      valid: isValid,
      value: newValue,
    });
  } 

  onInputChange = (event) => {
    const newValue = event.target.value;
    this.checkValidation(newValue);
  }

  invalidClick = () => {
    // eslint-disable-next-line
    for (let item of Object.entries(this.state.messages)) {
      this.props.addMessage(item[1]);
    }
    
    this.setState({messages: {}});
  }

  render() {
    const inputClasses = [classes.InputInput];
    const buttonClasses = [classes.Button];

    if (!this.state.valid) {
      inputClasses.push(classes.Invalid);
      buttonClasses.push(classes.Disable);
    } else if (!this.state.value.length) {
      buttonClasses.push(classes.Disable);
    }

    return (
      <div 
        className={classes.Container}
        onClick={this.props.onContainerClick}>
        <div 
          className={classes.Input}
          onClick={(e) => {e.stopPropagation()}}>

          <div className={classes.Header}>
            <div className={classes.Label}>{this.props.label}</div>
          </div>

          <div className={classes.Content}>
            <div></div>
            <input
              id="input"
              className={inputClasses.join(' ')} 
              type="text"
              onChange={this.onInputChange}
              value={this.state.value}
              autoFocus
              />
            <div className={classes.Buttons}>
              <div 
                className={classes.Button}
                onClick={this.props.onFail}
              >
                <div className={classes.ButtonLabel}>
                  {this.props.failLabel}
                </div>
              </div>
              <div 
                className={buttonClasses.join(' ')}
                onClick={!this.state.valid || !this.state.value.length ? this.invalidClick : () => this.props.onSuccess(this.state.value)}
              >
                <div className={classes.ButtonLabel}>
                  {this.props.successLabel}
                </div>
              </div>
            </div>
            <div></div>
          </div>

        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMessage: (message) => dispatch(actions.addMessage(message)),
  }
}

export default connect(null, mapDispatchToProps)(Input);