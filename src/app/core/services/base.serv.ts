import { IProxyHttp, ProxyHttp } from "../../../lib/source/fetch";

export class BaseService {
  protected proxyHttp: IProxyHttp;

  constructor() {
    if (!this.proxyHttp) {
      this.proxyHttp = new ProxyHttp();
    }
  }
}
