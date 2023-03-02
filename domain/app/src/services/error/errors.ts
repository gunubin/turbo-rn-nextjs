import {ApiError} from '@app/api/ApiError';
import {BaseError} from '@app/lib/error/types';

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

export const transformValidError = (error: ApiError): ValidError => {
  let fields: string[] = [];
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  for (const [, value] of Object.entries(error.fields!)) {
    fields = fields.concat(value);
  }
  return {
    base: error.base,
    code: error.code,
    fields: fields,
    original: error,
    status: error.status,
    type: 'valid',
  };
};
