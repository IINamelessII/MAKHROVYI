import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import NavigationBar from './containers/NavigationBar/NavigationBar';
import Screen from './hoc/Screen/Screen';
import Layout from './hoc/Layout/Layout';
import Messages from './containers/Messages/Messages';

import {rootId} from './shared/constants';

const asyncTutorials = asyncComponent(() => {
  return import('./containers/Tutorials/Tutorials');
});

const asyncInfo = asyncComponent(() => {
  return import('./containers/Info/Info');
});

const asyncFileBrowser = asyncComponent(() => {
  return import('./containers/FileBrowser/FileBrowser');
})

class App extends Component {
  render () {
    let routes = (
      <Switch>
        <Route path="/tutorials" component={asyncTutorials} />
        <Route path="/info" component={asyncInfo} />
        <Route path="/" exact component={asyncFileBrowser} />
        <Redirect from={"/directories/" + rootId} to="/" />
        <Route path="/directories/:dirHash" component={asyncFileBrowser} />
        <Route path="/files/:fileHash" component={asyncFileBrowser} />
        <Redirect to="/" />
      </Switch>
    );

    return (
      <Layout>
        <NavigationBar />
        <Screen>
          {routes}
        </Screen>
        <Messages />
        <div></div>
      </Layout>
    );
  }
}

export default App;
