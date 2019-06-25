import React from "react";
import Button from "antd/es/button";
// import styles from "./slide-menu.scss";
import { Menu, Icon } from "antd";
const { SubMenu } = Menu;

interface SlideProps {
  //
}
export default class Slide extends React.Component<SlideProps, any> {
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
        <Menu
          style={{ width: 256 }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>Navigation One</span>
              </span>
            }
          >
            <Menu.ItemGroup key="g1" title="Item 1">
              <Menu.Item key="1">Option 1</Menu.Item>
              <Menu.Item key="2">Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup key="g2" title="Item 2">
              <Menu.Item key="3">Option 3</Menu.Item>
              <Menu.Item key="4">Option 4</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
