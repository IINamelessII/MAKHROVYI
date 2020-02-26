import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import NavigationBar from './containers/NavigationBar/NavigationBar';
import Screen from './containers/Screen/Screen';

// const asyncSolutions = asyncComponent(() => {
//   return import('./containers/Solutions/Solutions');
// });

const asyncTutorials = asyncComponent(() => {
  return import('./containers/Tutorials/Tutorials');
});

const asyncUpload = asyncComponent(() => {
  return import('./containers/Upload/Upload');
});

const asyncFileBrowser = asyncComponent(() => {
  return import('./containers/FileBrowser/FileBrowser');
})

class App extends Component {
  render () {
    let routes = (
      <Switch>
        <Route path="/tutorials" component={asyncTutorials} />
        <Route path="/upload" component={asyncUpload} />
        <Route path="/" exact component={asyncFileBrowser} />
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
