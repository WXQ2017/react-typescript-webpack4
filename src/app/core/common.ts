import { ISites, Env } from "../../lib/source";

declare var PUBLIC_PATH: string;
declare var SITE_INFO: string;

export default class Common {
  static getSiteInfo(): ISites {
    const siteInfo: any = {};
    const o: any = {};
    o[Env.DEV] = siteInfo.DEV;
    o[Env.TEST] = siteInfo.TEST;
    o[Env.UAT] = siteInfo.UAT;
    o[Env.MASTER] = siteInfo.MASTER;
    return o;
  }
}
