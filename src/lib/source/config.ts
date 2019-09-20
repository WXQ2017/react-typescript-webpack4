import Axios from "axios";

/**
 * 环境枚举
 */
export const enum Env {
  DEV = 1,
  TEST,
  UAT,
  MASTER
}

export function getEnv(name: string) {
  switch (name) {
    case "DEV":
      return Env.DEV;
    case "TEST":
      return Env.TEST;
    case "UAT":
      return Env.UAT;
    case "MASTER":
      return Env.MASTER;
    default:
      return Env.DEV;
  }
}
/**
 * 主机信息
 */
export interface IHost {
  domain?: string;
  dir: string;
}

/**
 * 站点信息
 */
export interface ISite {
  local: string;
  remote: string;
  appID?: string;
  protocol?: string;
}
/**
 * 主机、站点集合对象
 */
export declare interface IHosts {
  [key: string]: IHost;
}
export declare interface ISites {
  [key: string]: ISite;
}

/**
 * 服务器配置对象
 */
export interface IServerConfig {
  appKey: string[];
  env: Env;
  debug: boolean;
  protocol: string;
  publicPath: string;
  sites: ISites;
  successCode: string;
  successCallback?: <T>(
    res: T,
    resolve: T | PromiseLike<T> | undefined,
    reject: any
  ) => void;
  failCallback?: <T>(
    res: T,
    resolve: (value?: T | PromiseLike<T> | undefined) => void,
    reject: any
  ) => void;
  isMock?: boolean;
  wXJsSign?: string;
  wXOAuth?: string;
  jsApiList?: string[];
}
/**
 * 接口配置对象
 */
export interface IApiConfig {
  [key: string]: any;
  /**
   * 主机信息
   */
  hosts: IHosts;
  /**
   * post 方式接口配置
   */
  post: { [key: string]: string };
  /**
   * get 方式接口配置
   */
  get: { [key: string]: string };
  /**
   * put 方式接口配置
   */
  put: { [key: string]: any };
  /**
   * delete 方式接口配置
   */
  delete: { [key: string]: any };
  /**
   * 各服务代理（可选）
   */
  serviceFactory?: any;
}

export interface IConfigAdapter {
  env: Env;
  readonly hosts: IHosts;
  readonly domain: string;

  curSite: ISite;
  localSite: string;
  getApi(method: string, apiName: string): string;
}
export class ConfigAdapter implements IConfigAdapter {
  static envInfo: any = {};
  env: Env = Env.DEV;
  hosts: IHosts;
  domain: string;
  curSite: ISite;
  localSite: string;
  serverConfig: IServerConfig;
  constructor(private apiConfig: IApiConfig, serverConfig: IServerConfig) {
    this.serverConfig = serverConfig;
    this.hosts = apiConfig.hosts;
    this.dealAsyncConfig();
  }
  dealAsyncConfig() {
    this.curSite = !!this.serverConfig.sites
      ? this.serverConfig.sites[this.env]
      : { local: window.location.host, remote: window.location.host };
    debugger;
    this.domain = this.curSite.remote || "";
    this.localSite =
      location.protocol +
      "//" +
      this.curSite.local +
      this.serverConfig.publicPath;
  }
  public getApi(method: string, apiName: string): string {
    if (this.apiConfig[method] && this.apiConfig[method][apiName]) {
      return this.apiConfig[method][apiName];
    }
    return apiName;
  }
  static fetchConfig(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.envInfo.env) {
        resolve(this.envInfo);
      } else {
        const url: any = "/config/site.json?t=" + Date.now();
        Axios.get(url)
          .then(res => {
            const o: any = {};
            o[Env.DEV] = res.data.DEV;
            o[Env.TEST] = res.data.TEST;
            o[Env.UAT] = res.data.UAT;
            o[Env.MASTER] = res.data.MASTER;
            const env = getEnv(res.data.runtimes);
            const sites = o;
            this.envInfo = { env, sites };
            resolve(this.envInfo);
          })
          .catch(reason => {
            reject();
          });
      }
    });
  }
}
