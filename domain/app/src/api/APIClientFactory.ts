import {AxiosRequestConfig, AxiosRequestHeaders} from 'axios';

import {APIClient} from '@domain/app/api/APIClient';

export class APIClientFactory {
  static instance: APIClientFactory;
  private map = new Map<string, APIClient>();

  static create() {
    if (APIClientFactory.instance) {
      return APIClientFactory.instance;
    }
    APIClientFactory.instance = new APIClientFactory();
    return APIClientFactory.instance;
  }

  async getBaseHeaders(config: AxiosRequestConfig) {
    config.headers = {
      ...config.headers,
      Accept: 'application/json',
      'Accept-Language': 'ja-JP',
      'Content-Type': 'application/json',
    };
    return config;
  }

  getClient(apiBaseUrl: string) {
    const client = this.map.get(apiBaseUrl);
    if (client) {
      return client;
    }
    const newClient = APIClient.create(apiBaseUrl);
    newClient.use(async (config) => {
      // https://github.com/axios/axios/issues/5034#issuecomment-1408548737
      // config.headers.setAuthorization
      config.headers = {
        ...config.headers,
      } as AxiosRequestHeaders;
      const baseConfig = await this.getBaseHeaders(config);
      return {...baseConfig, ...config};
    });
    this.map.set(apiBaseUrl, newClient);
    return newClient;
  }
}
