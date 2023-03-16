import {BaseError} from '@domain/app/models/error/BaseError';

export type ErrorDisplayType = 'toast' | 'dialog';

type ErrorDialogAction = undefined | (() => void);

export type ErrorDialogPayload = {
  displayType: 'dialog';
  actions?: Record<string, ErrorDialogAction>;
  message?: string;
  title: string;
};

export type ErrorToastPayload = {
  displayType: 'toast';
  message: string;
};

export type ErrorPayload = ErrorDialogPayload | ErrorToastPayload;

export type ErrorHandler<E extends BaseError> = (
  error: E
) => ErrorPayload | [ErrorDialogPayload, ErrorToastPayload] | undefined;

export interface IErrorDisplayManager<T> {
  show(params: {
    error: T;
    defaultErrorDisplayType?: ErrorDisplayType;
  }): Promise<void>;
}

export interface IErrorDisplay<T extends BaseError> {
  show(params: {
    error: T;
    defaultErrorDisplayType?: ErrorDisplayType;
  }): Promise<void>;
}
