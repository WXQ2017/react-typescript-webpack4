import { BaseService } from "./base.serv";

export interface ICommonService {}

export class CommonService extends BaseService implements ICommonService {
  constructor() {
    super();
  }
  public common(flag: string, subFlag: number): Promise<any> {
    return this.proxyHttp.get("common", {}, [flag, subFlag + ""]);
  }
}
