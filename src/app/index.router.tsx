import { Switch, Route, Redirect } from "react-router";
import React from "react";
import Layout from "./pages/layout/layout";
import SystemUsers from "./pages/system-users/system-users";
// import * as PageLazyLoading from "./routes";

export default class Router extends React.Component {
  render() {
    return (
      <Switch>
        {/*配置默认路由*/}
        <Route exact path="/" render={() => <Redirect to="/b" />}>
          <Route path={`/system/userManage`} component={SystemUsers} />
          <Route path="/b" component={Layout} />
        </Route>
      </Switch>
      // <Switch history={hashHistory}>
      //   <Route path="/" component={Layout}>
      //     <IndexRoute component={Layout} />
      //     {/** *系统设置 开始 */}
      //     <Route path={`/system/userManage`} component={SystemUsers} />
      //     {/** *系统设置 结束 */}
      //   </Route>
      //   <Route path="*" component={Layout} />
      // </Switch>
    );
  }
}
