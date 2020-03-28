import React, {Component} from 'react';

import classes from './Info.css';

class Info extends Component {
  render() {
    return (
      <div className={classes.Info}>
        <div className={classes.Rules}>
          <p className={classes.Rule}>Everybody can download solutions as separated files or whole directories.</p>
          <p className={classes.Rule}>Everybody can upload files and create directories after authentication.</p>
          <p className={classes.Rule}>Please respect other users and do not duplicate existing directories.</p>
          {/* <p className={classes.Rule}></p>
          <p className={classes.Rule}></p> */}
        </div> 
      </div>
    );
  }
}

export default Info;