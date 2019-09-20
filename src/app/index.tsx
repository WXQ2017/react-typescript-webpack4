import React from "react";
import * as ReactDOM from "react-dom";

import App from "./app";
// import 'antd/dist/antd.css';
import "./styles/index.scss";
// 配置
import { ConfigAdapter } from "../lib/source";
ConfigAdapter.fetchConfig().then(() => {
  ReactDOM.render(<App />, document.getElementById("app"));
});
