import * as React from "react";
import Slide from "../../components/slide-menu/slide-menu";

interface LayoutProps {
  compiler: string;
  framework: string;
}

export class Layout extends React.Component<LayoutProps, {}> {
  render() {
    return (
      <div>
        <Slide />
        <h1>
          Hello from {this.props.compiler} and {this.props.framework}!
        </h1>
      </div>
    );
  }
}
