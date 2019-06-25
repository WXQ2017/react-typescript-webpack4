import { Switch, Route, Redirect } from "react-router";
import React from "react";
import Layout from "./pages/layout/layout";
// import * as PageLazyLoading from "./routes";

export default class Router extends React.Component {
  render() {
    return (
      <Switch>
        {/*配置默认路由*/}
        <Route exact path="/" render={() => <Redirect to="/b" />} />
        <Route path="/b" component={Layout} />
      </Switch>
    );
  }
}
