import { Menu } from "element-react";
import React from "react";
import styles from "./slide-menu.scss";

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
      <div>111</div>
      // <Menu
      //   defaultActive="2"
      //   className="el-menu-vertical-demo"
      //   onOpen={this.onOpen.bind(this)}
      //   onClose={this.onClose.bind(this)}
      // >
      //   <Menu.SubMenu
      //     index="1"
      //     title={
      //       <span>
      //         <i className="el-icon-message" />
      //         导航一
      //       </span>
      //     }
      //   >
      //     <Menu.ItemGroup title="分组一">
      //       <Menu.Item index="1-1">选项1</Menu.Item>
      //       <Menu.Item index="1-2">选项2</Menu.Item>
      //     </Menu.ItemGroup>
      //     <Menu.ItemGroup title="分组2">
      //       <Menu.Item index="1-3">选项3</Menu.Item>
      //     </Menu.ItemGroup>
      //   </Menu.SubMenu>
      //   <Menu.Item index="2">
      //     <i className="el-icon-menu" />
      //     导航二
      //   </Menu.Item>
      //   <Menu.Item index="3">
      //     <i className="el-icon-setting" />
      //     导航三
      //   </Menu.Item>
      // </Menu>
    );
  }
}
