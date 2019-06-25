import * as React from "react";
import Slide from "../../components/slide-menu/slide-menu";
import Button from "antd/es/button";

interface LayoutProps {
  compiler: string;
  framework: string;
}

export default class Layout extends React.Component<LayoutProps, {}> {
  render() {
    return (
      <div>
        <Slide />
        <h1>
          Hello world!
        </h1>
      </div>
    );
  }
}
