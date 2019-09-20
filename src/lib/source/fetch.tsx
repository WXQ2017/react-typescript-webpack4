const MockAdapter = require("axios-mock-adapter");
import React from "react";
import Axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios";
import { ICommon, Common } from "./common";

export const HEADER_TOKEN = "HEADER_TOKEN";
export interface IProxyHttp {
  /**
   * 代理get请求
   * @param api config定义的接口名
   * @param params 请求参数
   */
  get<T, K>(api: string, params?: K, path?: string[]): Promise<T>;
  /**
   * 代理put请求
   * @param api config定义的接口名
   * @param params 请求参数
   */
  put<T, K>(api: string, params?: K, path?: string[]): Promise<T>;
  /**
   * 代理post请求
   * @param api config定义的接口
   * @param params 请求参数
   */
  post<T, K>(api: string, params: K, path?: string[]): Promise<T>;
  /**
   * 代理delete请求
   * @param api config定义的接口
   * @param pathParams 请求参数
   */
  delete<T, K>(api: string, pathParams?: string[], data?: K | any): Promise<T>;
  form<T>(api: string, form: FormData): Promise<T>;
  getFile(url: string): Promise<{ data: Blob; type: any }>;
  /**
   * 初始化代理
   */
  initInterceptors(): void;
}

export class ProxyHttp implements IProxyHttp {
  private reqInterceptor: any;
  private resInterceptor: any;
  private common: ICommon;
  private pending: Array<{ path: string; cancel: any }> = [];
  constructor() {
    if (!this.common) {
      this.common = new Common();
    }
  }
  public get<T, K>(api: string, params: K, path?: string[]): Promise<T> {
    let url = this.common.dealPath(api, "GET");
    if (path) {
      const param = path.join("/");
      url += "/" + param;
    }
    debugger;
    return Axios.get(url, { params }).then<T>(this.fulfilled);
  }
  put<T, K>(api: string, data?: K, pathParams?: string[]): Promise<T> {
    let url = this.common.dealPath(api, "PUT");
    if (pathParams) {
      const path = pathParams.join("/");
      url = url + "/" + path;
    }
    return Axios.put(url, data).then<T>(this.fulfilled);
  }
  public post<T, K>(api: string, data: K, path?: string[]): Promise<T> {
    let url = this.common.dealPath(api, "POST");
    if (path) {
      const param = path.join("/");
      url += "/" + param;
    }
    return Axios.post(url, data).then<T>(this.fulfilled);
  }
  delete<T, K>(
    api: string,
    pathParams?: string[],
    data: K | any = {}
  ): Promise<T> {
    let url = this.common.dealPath(api, "DELETE");
    if (pathParams) {
      url = url + "/" + pathParams.join("/");
    }
    return Axios.delete(url, {
      params: data
    }).then<T>(this.fulfilled);
  }
  public form<T>(api: string, form: FormData): Promise<T> {
    const url = this.common.dealPath(api, "POST");
    return Axios.post(url, form, {
      headers: { "Content-Type": undefined }
    }).then<T>(this.fulfilled);
  }
  getFile(url: string): Promise<{ data: Blob; type: any }> {
    return Axios.get(url, {
      headers: {
        accessToken: ""
      },
      responseType: "blob"
    }).then((res: AxiosResponse) => {
      return new Promise<{ data: Blob; type: any }>((resolve, reject) => {
        resolve({ data: res.data, type: res.headers["content-type"] });
      });
    });
  }
  initInterceptors() {
    Axios.interceptors.request.eject(this.reqInterceptor);
    this.reqInterceptor = Axios.interceptors.request.use(
      config => {
        config.cancelToken = new Axios.CancelToken(c => {
          this.pending.push({
            cancel: c,
            path: [
              config.url,
              config.method,
              JSON.stringify(config.params),
              JSON.stringify(config.data)
            ].join(",")
          });
        });
        const headerToken = sessionStorage.getItem(HEADER_TOKEN);
        config.headers["access-token"] = headerToken || "";
        config.headers.version = "1.0.0";
        return config;
      },
      error => {
        // Do something with request error
        return Promise.reject(error);
      }
    );
    Axios.interceptors.response.eject(this.resInterceptor);
    this.resInterceptor = Axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        // console.log(error);
        if (error.response && error.response.data) {
          return Promise.reject(error.response.data);
        } else if (error instanceof Axios.Cancel) {
          const cancelError = new Error();
          cancelError.name = "Simultaneous Request";
          cancelError.message = "重复请求了接口 " + error.message;
          return Promise.reject(cancelError);
        } else {
          return Promise.reject(error);
        }
      }
    );
  }
  private fulfilled<T>(res: AxiosResponse) {
    const promise = new Promise<T>((resolve, reject) => {
      if (res.data.hasOwnProperty("status") && res.data.status + "" === "200") {
        resolve(res.data.data);
      } else {
        reject(res.data);
      }
    });
    return promise;
  }
}
