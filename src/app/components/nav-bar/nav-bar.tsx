import React from "react";
import { Layout, Menu } from "element-react";
import { Link } from "react-router-dom";
import "./nav-bar.scss";
interface NavBarProps {
  //
}
export default class NavBarComp extends React.Component<NavBarProps, any> {
  constructor(props: any) {
    super(props);
  }
  public onSelect(index: number, indexPath: string) {
    console.log(index, indexPath);
  }
  public onClose() {
    //
  }
  render() {
    return (
      <div className="nav-bar">
        <div className=""></div>
      </div>
    );
  }
}
