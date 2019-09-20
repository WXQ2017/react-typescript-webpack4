import { IApiConfig } from "../../lib/source";

export const apiConfig: IApiConfig = {
  hosts: {
    apiHost: {
      dir: "/gcp-site-api"
    }
  },
  post: {},
  get: {
    common: "apiHost:/gcp/ec/info"
  },
  put: {},
  delete: {}
};
