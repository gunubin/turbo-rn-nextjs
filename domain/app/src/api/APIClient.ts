import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';

import {ApiClientConfig, Method} from '@app/api/types';

export class APIClient {
  static create(apiBaseUrl: string) {
    return new APIClient(axios.create(), apiBaseUrl);
  }

  constructor(private axios: AxiosInstance, private baseUrl: string) {
    // this.axios.interceptors.request.use((request) => {
    //   console.info('Request: ', request);
    //   return request;
    // });
    // this.axios.interceptors.response.use(
    //   (response) => {
    //     console.info('Response: ', response);
    //     return response;
    //   },
    //   (error) => {
    //     console.info('Response: ', {error});
    //     return Promise.reject(error);
    //   }
    // );
  }

  use(
    interceptor: (
      config: InternalAxiosRequestConfig
    ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>
  ) {
    this.axios.interceptors.request.use(interceptor);
  }

  private makeConfig(config: ApiClientConfig, url: string): AxiosRequestConfig {
    const isQueryParameter = isPreferQueryParameter(config.method);
    return {
      data: !isQueryParameter ? config.parameter : undefined,
      headers: config.headers,
      method: config.method,
      params: isQueryParameter ? config.parameter : undefined,
      url,
    };
  }

  async request(config: ApiClientConfig): Promise<any /* FIXME: type */> {
    const {path} = config;
    const url = `${this.baseUrl}${path}`;
    const axiosConfig = this.makeConfig(config, url);

    return new Promise((resolve, reject) => {
      this.axios(axiosConfig)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

const isPreferQueryParameter = (method: Method) => {
  switch (method) {
    case 'GET':
    case 'HEAD':
    case 'DELETE':
      return true;
    default:
      return false;
  }
};
