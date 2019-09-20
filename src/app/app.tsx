import React from "react";
import * as ReactDOM from "react-dom";
import RRouter from "./index.router";
import "./styles/iconfont/iconfont.js";
import { apiConfig } from "./config";

export default class App extends React.Component {
  render() {
    return <RRouter />;
  }
}
