import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import NavigationBar from './containers/NavigationBar/NavigationBar';
import Screen from './containers/Screen/Screen';
import Solutions from './containers/Solutions/Solutions';
import Tutorials from './containers/Tutorials/Tutorials';
import Upload from './containers/Upload/Upload';

class App extends Component {
  render () {
    let routes = (
      <Switch>
        <Route path="/tutorials" component={Tutorials} />
        <Route path="/upload" component={Upload} />
        <Route path="/" exact component={Solutions} />
        <Redirect to="/" />
      </Switch>
    )

    return (
      <div>
        <NavigationBar />
        <Screen>
          {routes}
        </Screen>
      </div>
    );
  }
}

export default App;
