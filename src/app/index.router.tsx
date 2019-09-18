import { Redirect, browserHistory } from "react-router";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import LayoutPage from "./pages/layout/layout";
import SystemUsers from "./pages/system-users/system-users";
import GcpAssociationListPage from "./pages/gcp-association-list/gcp-association-list";
// import * as PageLazyLoading from "./routes";

// export default () => (
//   <Switch history={hashHistory}>
//     <Route path="/" component={Layout}>
//       <IndexRoute component={Layout}></IndexRoute>
//       <Route path="/gcpmgr" component={GcpAssociationListPage} />
//     </Route>
//   </Switch>
// );

export default class RRouter extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Switch>
          <Route path="/">
            <LayoutPage exact path="/" component={LayoutPage}>
              <Route path="/gcpmgr" component={GcpAssociationListPage} />
            </LayoutPage>
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}
