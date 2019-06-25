import React from "react";
import Button from "antd/es/button";
// import styles from "./slide-menu.scss";
import { Menu, Icon } from "antd";
const { SubMenu } = Menu;

interface SlideProps {
  //
}
export default class SlideMenu extends React.Component<SlideProps, any> {
  constructor(props: any) {
    super(props);
  }
  public onOpen() {
    //
  }
  public onClose() {
    //
  }
  render() {
    return (
      <div>
        <div style={{ height: 64 }}>logo</div>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>UI</span>
              </span>
            }
          >
            <Menu.ItemGroup key="g1" title="Table">
              <Menu.Item key="1">按钮</Menu.Item>
              <Menu.Item key="2">表单</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <Menu.Item key="3">Form</Menu.Item>
        </Menu>
      </div>
    );
  }
}
