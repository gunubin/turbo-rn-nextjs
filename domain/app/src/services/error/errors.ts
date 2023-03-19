import {ApiError} from '@domain/app/api/ApiError';
import {BaseError} from '@domain/app/models/error/BaseError';

export type AppError = BaseError<'App'>;

// TODO: 命名
export type NetworkError = BaseError<'network', ApiError> & {
  code?: string;
  base?: string[]; // FIXME: サーバーサイドエラーメッセージ？
  status: number;
};

export type ValidError = BaseError<'valid', ApiError> & {
  code?: string;
  base?: string[];
  fields?: string[];
  status: number;
};

export const transformApplicationError = (error: Error): AppError => {
  return {
    original: error,
    type: 'App',
  };
};

export const transformNetworkError = (error: ApiError): NetworkError => {
  return {
    base: error.base,
    code: error.code,
    original: error,
    status: error.status,
    type: 'network',
  };
};

