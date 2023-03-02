import {AxiosRequestHeaders} from 'axios';

export type Method = 'POST' | 'PUT' | 'GET' | 'PATCH' | 'DELETE' | 'HEAD';

export type ApiClientConfig = {
  parameter?: any;
  headers?: AxiosRequestHeaders;
  method: Method;
  path: string;
};
