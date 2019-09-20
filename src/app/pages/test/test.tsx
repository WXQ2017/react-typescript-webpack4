import React from "react";
import Panel from "../../../common/component/panel/panel";
import { AutowiredService } from "../../../lib/source/decorators";
import { CommonService } from "../../core/services/common.serv";

export default class TestPage extends React.Component {
  @AutowiredService
  commonService: CommonService;
  render() {
    return (
      <div>
        <Panel />
      </div>
    );
  }
  async fetchData() {
    try {
      await this.commonService.common("1", 1);
    } catch (error) {
      console.log(error);
    }
  }
  componentDidMount() {
    this.fetchData();
  }
}
