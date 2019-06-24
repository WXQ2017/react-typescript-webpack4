import React from "react";
import * as ReactDOM from "react-dom";
import { Switch, Route, Redirect } from "react-router";
import { Layout } from "./pages/layout/layout";

export default class App extends React.Component {
  render() {
    return (
      <Switch>
        {/*配置默认路由*/}
        <Route exact path="/" render={() => <Redirect to="/a" />} />
        <Route path="/a" component={Layout} />
      </Switch>
    );
  }
}
