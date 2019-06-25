import * as React from "react";
import Slide from "../../components/slide-menu/slide-menu";
import { Layout } from "antd";
import "./layout.less";
const { Header, Footer, Sider, Content } = Layout;

interface LayoutProps {
  compiler: string;
  framework: string;
}

export default class LayoutPage extends React.Component<LayoutProps, {}> {
  render() {
    return (
      <Layout className="full-page">
        <Sider>
          <Slide />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>Header</Header>
          <Content />
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}
