import React from "react";
import * as ReactDOM from "react-dom";

import { Layout } from "./pages/layout/layout";

ReactDOM.render(
  <Layout compiler="TypeScript" framework="React" />,
  document.getElementById("app")
);

// export interface AppProps { compiler: string; framework: string; }
// export class App extends React.Component<AppProps> {
//   render() {
//       return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
//   }
// }
