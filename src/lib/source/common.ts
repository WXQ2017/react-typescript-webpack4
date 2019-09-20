import { IConfigAdapter, IHost, ConfigAdapter } from "./config";
import { apiConfig } from "../../app/config";
import { serverConfig } from "../../app/config/site.conf";
export interface ICommon {
  dealPath(apiKey: string, method: string): string;
}
export type ICommonConstructor = new () => ICommon;

export function createCommon(ctor: ICommonConstructor): ICommon {
  return new ctor();
}
export class Common implements ICommon {
  private configAdapter: IConfigAdapter;
  constructor() {
    if (!this.configAdapter) {
      this.configAdapter = new ConfigAdapter(apiConfig, serverConfig);
    }
  }
  public dealPath(apiKey = "", method = "GET"): string {
    let api = "";
    let url = apiKey;
    method = method.toLocaleLowerCase();
    api = this.configAdapter.getApi(method, apiKey);
    if (api === "") {
      return api;
    }
    if (api.indexOf(":") !== -1) {
      url = "{PROTOCOL}//{DOMAIN}{HOST}{API}";
      const path = api.split(":");
      path[0] = this.trim(path[0]);
      path[1] = this.trim(path[1]);
      const host: IHost = this.configAdapter.hosts[path[0]];
      const domain =
        host && host.domain ? host.domain : this.configAdapter.domain;
      url = url
        .replace(
          /\{PROTOCOL}/,
          this.configAdapter.curSite.protocol || location.protocol
        )
        .replace(/\{DOMAIN}/, domain)
        .replace(/\{HOST}/, host.dir)
        .replace(/\{API}/, path[1]);
    } else {
      url = api;
    }
    return url;
  }
  public trim(s: string): string {
    return s.replace(/(^\s*)|(\s*$)/g, "");
  }
}
