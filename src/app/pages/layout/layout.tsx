import * as React from "react";


interface LayoutProps { compiler: string; framework: string; }


export class Layout extends React.Component<LayoutProps, {}> {
    render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}