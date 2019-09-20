import { Env, HEADER_TOKEN, IServerConfig } from "../../lib/source";
import Common from "../core/common";
import { LOGIN_INFO } from "../core/constants";

export const serverConfig: IServerConfig = {
  appKey: [],
  debug: false,
  env: Env.DEV,
  isMock: false,
  protocol: window.location.protocol,
  publicPath: "/",
  sites: Common.getSiteInfo(),
  successCode: "0"
};

serverConfig.failCallback = (res: any, resolve, reject) => {
  if (res.errorCode === 1001 && res.subCode === 1001) {
    sessionStorage.removeItem(HEADER_TOKEN);
    sessionStorage.removeItem(LOGIN_INFO);
    const nextPath = (window as any).__SWNextFullPath;
    if (nextPath.indexOf("/login") === -1 && nextPath.indexOf("spm=") === -1) {
      // location.href = "/login";
      // console.log("TO LOGIN------------------------");
    }
  } else if (res.errorCode === 1003 && res.subCode === 1001) {
  } else {
    reject(res);
  }
};
