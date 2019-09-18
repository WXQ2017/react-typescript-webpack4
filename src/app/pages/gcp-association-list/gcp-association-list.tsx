import * as React from "react";
import Slide from "../../components/slide-menu/slide-menu";
import "./gcp-association-list.scss";
import {
  Layout,
  Breadcrumb,
  Card,
  Input,
  Table,
  Pagination,
  Button
} from "element-react";
// import { inject, observer } from 'mobx-react';
interface IGcpAssociationListProps {
  // columns: any[];
  // data: any[];
}
// @inject('router', 'global')
// @observer
export default class GcpAssociationListPage extends React.Component<
  IGcpAssociationListProps,
  { columns; data }
> {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          label: "序号",
          type: "index"
        },
        {
          label: "中心名称",
          prop: "name"
        }
      ],
      data: [
        {
          name: "xx"
        }
      ]
    };
  }
  render() {
    return (
      <div className="gcp-association-list">
        <Breadcrumb separator="/" className="m-bottom-20">
          <Breadcrumb.Item>GCP管理</Breadcrumb.Item>
          <Breadcrumb.Item>中心列表</Breadcrumb.Item>
        </Breadcrumb>
        <Card className="clearfix text-right" bodyStyle={{ padding: "10px" }}>
          <Button type="primary" className="fl">
            新增协会
          </Button>
          <Input className="limit-width-300" placeholder="请输入内容" />
        </Card>
        <Table
          className="m-top-20"
          style={{ width: "100%" }}
          columns={this.state.columns}
          data={this.state.data}
        />
      </div>
    );
  }
}
