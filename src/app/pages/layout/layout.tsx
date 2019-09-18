import * as React from "react";
import Slide from "../../components/slide-menu/slide-menu";
import "./layout.scss";
import { Layout, Menu } from "element-react";
import Header from "../../components/nav-bar/nav-bar";
// import { inject, observer } from 'mobx-react';
interface ILayoutProps {
  compiler: string;
  framework: string;
}
// @inject('router', 'global')
// @observer
export default class LayoutPage extends React.Component<any, {}> {
  render() {
    return (
      <Layout.Row className="admin__main__container">
        <Layout.Col span={4} style={{ flex: "0 0 200px", height: "100%" }}>
          <Slide />
        </Layout.Col>
        <Layout.Col
          span={20}
          style={{ flex: "auto", overflowX: "hidden", overflowY: "scroll" }}
        >
          <Layout.Row className="admin__headerNav">
            <Header />
          </Layout.Row>

          <div style={{ padding: "20px" }}>{this.props.children}</div>
        </Layout.Col>
      </Layout.Row>
    );
  }
}
